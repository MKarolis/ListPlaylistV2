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

        [HttpGet]
        public String GetTest()
        {
            return "Test";
        }

        //auth both spotify and youtube
        //create blank playlist
        //insert all the songs from spotify
        //return playlist

        [HttpGet("playlist")]
        // [Authorize]
        public IActionResult MigratePlaylist([FromHeader] string googleAuthToken, [FromHeader] string spotifyAuthToken, [FromHeader] string playlistId)
        {
            /* Spotify */
            _spotify = new SpotifyWebAPI()
            {
                TokenType = "Bearer",
                AccessToken = spotifyAuthToken
            };

            // Get playlist tracks
            Task<Paging<PlaylistTrack>> tracks = _spotify.GetPlaylistTracksAsync(playlistId);

            List<SpotifyTrack> mappedTracks =
                tracks.Result.Items.Select(track => SpotifyTrackMapper.map(track)).ToList();

            List<string> queries = mappedTracks.Select(track =>
            {
                string Artists = "";

                foreach (string Artist in track.Artists)
                    Artists += Artist + " ";

                return track.Name + " " + Artists;
            }).ToList();

            /* Google */

            string[] scopes = new string[]
            {
                YouTubeService.Scope.Youtube
            };

            GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
            {
                ClientSecrets = new ClientSecrets
                {
                    ClientId = "709242795506 - 2i1012a78mitl16o3cejahdjn5r93s0q.apps.googleusercontent.com",
                    ClientSecret = "VxxDypG9NziMbD6HwlLPlv - W"
                },
                Scopes = scopes,
                DataStore = new FileDataStore("Store")
            });

            TokenResponse token = new TokenResponse
            {
                AccessToken = googleAuthToken
            };

            UserCredential credential = new UserCredential(flow, Environment.UserName, token);

            _youtube = new YouTubeService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = this.GetType().ToString()
            });

            //return Ok(_youtube.Playlists.List("snippet").Id);

            PlaylistsResource.ListRequest playlists = _youtube.Playlists.List("snippet");

            var res = playlists.ExecuteAsync();

            return Ok(Json(res.Result.Items));

            //_youtube.
        }
    }
}