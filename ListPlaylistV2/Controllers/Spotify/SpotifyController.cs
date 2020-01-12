using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.Web;
using SpotifyAPI.Web.Models;
using SpotifyAPI.Web.Auth;
using System.Text.Json.Serialization;
using Unosquare.Swan;
using ListPLaylistV2.Models.Spotify.Mappers;
using ListPLaylistV2.Models.Spotify;
using ListPLaylistV2.Controllers.utils;
using Google.Apis.Services;
using Google.Apis.Upload;
using Google.Apis.Util.Store;
using Google.Apis.Auth.OAuth2;
using Google.Apis.YouTube.v3;
using Google.Apis.YouTube.v3.Data;
using Microsoft.EntityFrameworkCore;
using SpotifyAPI.Web.Enums;

// Catch 500 sometime later
// Check if token has expired 

namespace ListPLaylistV2.Controllers.Spotify
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpotifyController : Controller
    {
        private SpotifyWebAPI _spotify;
        private YouTubeService _youtube;

        [HttpGet("playlists")]
        // [Authorize]
        //public IActionResult GetPlaylists([FromHeader] string accessToken, [FromHeader] string tokenType)
        public IActionResult GetPlaylists([FromHeader] string spotifyAuthToken)
        {
            _spotify = new SpotifyWebAPI()
            {
                TokenType = "Bearer",
                AccessToken = spotifyAuthToken
            };

            string userId = _spotify.GetPrivateProfileAsync().Result.Id;
            Task<Paging<SimplePlaylist>> playlists = _spotify.GetUserPlaylistsAsync(userId);

            if (playlists.Await().HasError())
                return BadRequest(playlists.Exception.Message);

            HttpContext.Response.ContentType = "application/json";

            return Ok(Json(playlists.Result.Items));
        }

        [HttpGet("tracks")]
        // [Authorize]
        public IActionResult GetTracks([FromHeader] string spotifyAuthToken, [FromHeader] string playlistId)
        {
            _spotify = new SpotifyWebAPI()
            {
                TokenType = "Bearer",
                AccessToken = spotifyAuthToken
            };

            Task<Paging<PlaylistTrack>> tracks = _spotify.GetPlaylistTracksAsync(playlistId);

            if (tracks.Await().HasError())
                return BadRequest();

            HttpContext.Response.ContentType = "application/json";

            return Ok(Json(tracks.Result.Items.Select(track => SpotifyTrackMapper.map(track)).ToList()));
        }

        [HttpPost("playlist")]
        // [Authorize]
        public async Task<IActionResult> MigrateToSpotify([FromHeader] string spotifyAuthToken, [FromHeader] string googleAuthToken, [FromHeader] string playlistId)
        {
            /* Youtube */
            _youtube = new YouTubeService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = GoogleCredential.FromAccessToken(googleAuthToken),
                ApplicationName = this.GetType().ToString()
            });

            // Get playlist
            var requestPlaylistItems = _youtube.PlaylistItems.List("snippet");
            requestPlaylistItems.PlaylistId = playlistId;
            requestPlaylistItems.MaxResults = 50;

            var trackItems = requestPlaylistItems.ExecuteAsync().Result.Items;

            // Get playlist name
            var requestPlaylists = _youtube.Playlists.List("snippet");
            requestPlaylists.Mine = true;
            requestPlaylists.MaxResults = 50;

            var youtubePlaylists = requestPlaylists.ExecuteAsync().Result.Items;

            string playlistName = "";
            foreach (var playlist in youtubePlaylists)
            {
                if (playlist.Id == playlistId)
                {
                    playlistName = playlist.Snippet.Title;
                    break;
                }
            }

            // Form queries for Spotify
            List<string> queries = trackItems.Select(track => FormatTitle(track.Snippet.Title)).ToList();

            /* Spotify */
            _spotify = new SpotifyWebAPI()
            {
                TokenType = "Bearer",
                AccessToken = spotifyAuthToken
            };

            string userId = _spotify.GetPrivateProfileAsync().Result.Id;

            // Create playlist
            var spotifyPlaylist = _spotify.CreatePlaylistAsync(userId, playlistName);

            // return Ok(spotifyPlaylist.Result.Error.Message);

            List<String> uris = new List<string>();

            foreach (var query in queries)
            {
                var foundTracks = _spotify.SearchItemsAsync(query, SearchType.Track).Result.Tracks.Items;

                if (foundTracks.Count != 0)
                    await _spotify.AddPlaylistTrackAsync(spotifyPlaylist.Result.Id, foundTracks.First().Uri);
            }

            return Created("https://open.spotify.com/playlist/" + spotifyPlaylist.Result.Id, "https://open.spotify.com/playlist/"+spotifyPlaylist.Result.Id);
        }

        public string FormatTitle(string title)
        {
            title = title.ToLower();

            int found1 = title.IndexOf("(");
            if (found1 != -1)
                title = title.Substring(0, found1 - 1);

            int found2 = title.IndexOf("[");
            if (found2 != -1)
                title = title.Substring(0, found2 - 1);

            string[] trimWords =
            {
                "feat", "ft.",
                "official music video", "music video", "official video", "video",
                "with lyrics", "lyrics",
                "live performance", "live", "vevo",
                "/", "\\", "&", "!", "?", "@", "#", "-", "\"", ":",
            };

            foreach (string trimWord in trimWords)
                title = title.Replace(trimWord, "");

            return title;
        }
    }
}
