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
        public async Task<string> MigratePlaylist([FromHeader] string googleAuthToken, [FromHeader] string spotifyAuthToken, [FromHeader] string playlistId)
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

            _youtube = new YouTubeService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = GoogleCredential.FromAccessToken(googleAuthToken),
                ApplicationName = this.GetType().ToString()
            });


            var newPlaylist = new Playlist();
            newPlaylist.Snippet = new PlaylistSnippet();
            newPlaylist.Snippet.Title = "asd";
            newPlaylist.Snippet.Description = "asd";
            newPlaylist.Status = new PlaylistStatus();
            newPlaylist.Status.PrivacyStatus = "public";
            var playlistInsertReq = _youtube.Playlists.Insert(newPlaylist, "snippet,status");
            newPlaylist = await playlistInsertReq.ExecuteAsync();

            System.Diagnostics.Debug.WriteLine("\n");
            System.Diagnostics.Debug.WriteLine("\n");
            System.Diagnostics.Debug.WriteLine(queries.Count);
            System.Diagnostics.Debug.WriteLine("\n");
            System.Diagnostics.Debug.WriteLine("\n");

            foreach (string stringas in queries)
            {
                System.Diagnostics.Debug.WriteLine(stringas);

            }




            /* foreach (var stringas in queries)
         {
             Console.WriteLine(stringas);

             var req = _youtube.Search.List("snipper");
             req.Q = stringas;
             req.Type = "youtube#video";
             req.Order = SearchResource.ListRequest.OrderEnum.Relevance;

             var resp = await req.ExecuteAsync();

             var newPlaylistItem = new PlaylistItem();
             newPlaylistItem.Snippet = new PlaylistItemSnippet();
             newPlaylistItem.Snippet.PlaylistId = newPlaylist.Id;
             newPlaylistItem.Snippet.ResourceId = new ResourceId();
             newPlaylistItem.Snippet.ResourceId.Kind = "youtube#video";
             newPlaylistItem.Snippet.ResourceId.VideoId = resp.Items.First().Id.ToString();
             var playlistItemInsertReq = _youtube.PlaylistItems.Insert(newPlaylistItem, "snippet");
             var item = await playlistItemInsertReq.ExecuteAsync();

         }*/


            return newPlaylist.Id;



        }
    }
}