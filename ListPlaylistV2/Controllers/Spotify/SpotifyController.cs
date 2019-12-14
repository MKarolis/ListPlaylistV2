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

// Catch 500 sometime later
// Check if token has expired 

namespace ListPLaylistV2.Controllers.Spotify
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpotifyController : Controller
    {
        private SpotifyWebAPI _spotify;

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
        public IActionResult GetSongs([FromHeader] string spotifyAuthToken, [FromHeader] string playlistId)
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

        // POST: api/Spotify
        [HttpPost]
        public void Post([FromBody] string value)
        {

        }
    }
}
