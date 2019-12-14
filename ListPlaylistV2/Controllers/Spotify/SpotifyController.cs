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
using Newtonsoft.Json;
// using JsonSerializer = System.Text.Json.JsonSerializer;

// Catch 500 sometime later
// Check if token has expired 

namespace ListPLaylistV2.Controllers.Spotify
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpotifyController : Controller
    {
        private SpotifyWebAPI _spotify;

        private Tuple<string, string> GetAuthSeparated(String Authorization)
        {
            int separatorIndex = Authorization.IndexOf(' ');
            string tokenType = Authorization.Substring(0, separatorIndex);
            string accessToken = Authorization.Substring(separatorIndex + 1);

            return new Tuple<string, string>(tokenType, accessToken);
        }

        [HttpGet("playlists")]
        // [Authorize]
        //public IActionResult GetPlaylists([FromHeader] string accessToken, [FromHeader] string tokenType)
        public IActionResult GetPlaylists([FromHeader] string Authorization)
        {
            Tuple<string, string> auth = GetAuthSeparated(Authorization);

            _spotify = new SpotifyWebAPI()
            {
                TokenType = auth.Item1,
                AccessToken = auth.Item2
            };

            String userId = _spotify.GetPrivateProfileAsync().Result.Id;
            Task<Paging<SimplePlaylist>> playlists = _spotify.GetUserPlaylistsAsync(userId);

            if (playlists.Await().HasError())
                return BadRequest(playlists.Exception.Message);

            return Ok(Json(playlists.Result.Items));
        }

        [HttpGet("tracks")]
        // [Authorize]
        public IActionResult GetSongs([FromHeader] string Authorization, [FromHeader] string playlistId)
        {
            Tuple<string, string> auth = GetAuthSeparated(Authorization);
            _spotify = new SpotifyWebAPI()
            {
                TokenType = auth.Item1,
                AccessToken = auth.Item2
            };

            Task<Paging<PlaylistTrack>> tracks = _spotify.GetPlaylistTracksAsync(playlistId);

            if (tracks.Await().HasError())
                return BadRequest();

            return Ok(Json(tracks.Result.Items.Select(track => SpotifyTrackMapper.map(track)).ToList()));
        }

        // POST: api/Spotify
        [HttpPost]
        public void Post([FromBody] string value)
        {

        }
    }
}
