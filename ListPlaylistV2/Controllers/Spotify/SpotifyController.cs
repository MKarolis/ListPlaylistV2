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
using System.Text.Json;
using System.Text.Json.Serialization;
using Unosquare.Swan;
using ListPLaylistV2.Models.Spotify.Mappers;
using ListPLaylistV2.Models.Spotify;

// Catch 500 sometime later
// Check if token has expired 

namespace ListPLaylistV2.Controllers.Spotify
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpotifyController : ControllerBase
    {
        private SpotifyWebAPI _spotify;

        [HttpGet("playlists")]
        // [Authorize]
        public IActionResult GetPlaylists([FromHeader] string accessToken, [FromHeader] string tokenType)
        {
            _spotify = new SpotifyWebAPI()
            {
                AccessToken = accessToken,
                TokenType = tokenType // Always "Bearer"
            };

            String userId = _spotify.GetPrivateProfileAsync().Result.Id;

            Task<Paging<SimplePlaylist>> playlists = _spotify.GetUserPlaylistsAsync(userId);

            if (playlists.Await().HasError())
                return BadRequest(playlists.Exception.Message);

            return Ok(JsonSerializer.Serialize<List<SimplePlaylist>>(playlists.Result.Items));
        }

        [HttpGet("tracks")]
        // [Authorize]
        public IActionResult GetSongs([FromHeader] string accessToken, [FromHeader] string tokenType, [FromHeader] string playlistId)
        {
            _spotify = new SpotifyWebAPI()
            {
                AccessToken = accessToken,
                TokenType = tokenType // Always "Bearer"
            };
            
            Task<Paging<PlaylistTrack>> tracks = _spotify.GetPlaylistTracksAsync(playlistId);

            if (tracks.Await().HasError())
                return BadRequest();

            return Ok(JsonSerializer.Serialize<List<SpotifyTrack>>(tracks.Result.Items.Select(track => SpotifyTrackMapper.map(track)).ToList()));
        }

        // POST: api/Spotify
        [HttpPost]
        public void Post([FromBody] string value)
        {

        }
    }
}
