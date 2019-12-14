using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Google.Apis.Services;
using Google.Apis.Upload;
using Google.Apis.Util.Store;
using Google.Apis.YouTube.v3;
using Google.Apis.YouTube.v3.Data;
using SpotifyAPI.Web;
using SpotifyAPI.Web.Models;
using SpotifyAPI.Web.Auth;
using ListPLaylistV2.Controllers.utils;
using ListPLaylistV2.Models.Spotify;
using Microsoft.AspNetCore.Authorization;
using ListPLaylistV2.Models.Spotify.Mappers;
using Unosquare.Swan;

namespace ListPLaylistV2.Controllers.Google
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleController : Controller
    {
        private SpotifyWebAPI _spotify;
        private YouTubeService _youtube;

        [HttpGet("playlists")]
        // [Authorize]
        public IActionResult GetPlaylists([FromHeader] string googleAuthToken)
        {
            _youtube = new YouTubeService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = GoogleCredential.FromAccessToken(googleAuthToken),
                ApplicationName = this.GetType().ToString()
            });

            var requestPlaylists = _youtube.Playlists.List("snippet");
            requestPlaylists.Mine = true;
            requestPlaylists.MaxResults = 50;

            var playlists = requestPlaylists.ExecuteAsync().Result.Items;

            return Ok(Json(playlists));
        }

        [HttpGet("tracks")]
        // [Authorize]
        public IActionResult GetTracks([FromHeader] string googleAuthToken, [FromHeader] string playlistId)
        {
            _youtube = new YouTubeService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = GoogleCredential.FromAccessToken(googleAuthToken),
                ApplicationName = this.GetType().ToString()
            });

            var requestPlaylists = _youtube.PlaylistItems.List("snippet");
            requestPlaylists.PlaylistId = playlistId;
            requestPlaylists.MaxResults = 50;

            var trackItems = requestPlaylists.ExecuteAsync().Result.Items;

            List<string> queries = trackItems.Select(track => FormatTitle(track.Snippet.Title)).ToList();

            return Ok(Json(queries));
        }

        public string FormatTitle(string title)
        {
            title = title.ToLower();

            int found1 = title.IndexOf("(");
            if (found1 != -1)
                title = title.Substring(0, found1-1);

            int found2 = title.IndexOf("[");
            if (found2 != -1)
                title = title.Substring(0, found2-1);

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

        // Convertion progress, Duplex services 

        [HttpPost("playlist")]
        // [Authorize]
        public async Task<IActionResult> MigratePlaylist([FromHeader] string googleAuthToken, [FromHeader] string spotifyAuthToken, [FromHeader] string playlistId)
        {
            /* Spotify */
            _spotify = new SpotifyWebAPI()
            {
                TokenType = "Bearer",
                AccessToken = spotifyAuthToken
            };

            // Get playlist
            Task<FullPlaylist> playlist = _spotify.GetPlaylistAsync(playlistId);

            // Get playlist name
            string spotifyPlaylistName = playlist.Result.Name;

            // Get playlist tracks
            Paging<PlaylistTrack> spotifyTracks = playlist.Result.Tracks;

            List<SpotifyTrack> mappedTracks =
                spotifyTracks.Items.Select(track => SpotifyTrackMapper.map(track)).ToList();

            // Form queries for Youtube
            List<string> queries = mappedTracks.Select(track =>
            {
                string Artists = "";

                foreach (string Artist in track.Artists)
                    Artists += Artist + " ";

                return track.Name + " " + Artists;
            }).ToList();

            /* Google */
            _youtube = new YouTubeService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = GoogleCredential.FromAccessToken(googleAuthToken),
                ApplicationName = this.GetType().ToString()
            });

            // Create playlist
            var newPlaylist = new Playlist();
            newPlaylist.Snippet = new PlaylistSnippet();
            newPlaylist.Snippet.Title = spotifyPlaylistName;
            newPlaylist.Snippet.Description = "";
            newPlaylist.Status = new PlaylistStatus();
            newPlaylist.Status.PrivacyStatus = "public";
            var playlistInsertReq = _youtube.Playlists.Insert(newPlaylist, "snippet,status");
            newPlaylist = await playlistInsertReq.ExecuteAsync();

            // Add songs based on queries
            foreach (var query in queries)
            {
                var req = _youtube.Search.List("snippet");
                req.Q = query;
                req.Type = "youtube#video";
                req.MaxResults = 1;
                req.Order = SearchResource.ListRequest.OrderEnum.Relevance;

                var resp = await req.ExecuteAsync();

                var newPlaylistItem = new PlaylistItem();
                newPlaylistItem.Snippet = new PlaylistItemSnippet();
                newPlaylistItem.Snippet.PlaylistId = newPlaylist.Id;
                newPlaylistItem.Snippet.ResourceId = new ResourceId();
                newPlaylistItem.Snippet.ResourceId.Kind = "youtube#video";
                newPlaylistItem.Snippet.ResourceId.VideoId = resp.Items.First().Id.VideoId;
                var playlistItemInsertReq = _youtube.PlaylistItems.Insert(newPlaylistItem, "snippet");
                var item = await playlistItemInsertReq.ExecuteAsync();
            }

            return Created("https://www.youtube.com/playlist?list=" + newPlaylist.Id, null);
        }
    }
}