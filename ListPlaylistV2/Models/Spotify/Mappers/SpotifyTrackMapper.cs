using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SpotifyAPI.Web.Models;

namespace ListPLaylistV2.Models.Spotify.Mappers
{
    public static class SpotifyTrackMapper
    {
        public static SpotifyTrack map(PlaylistTrack playlistTrack)
        {
            return new SpotifyTrack(
                playlistTrack.Track.Name,
                playlistTrack.Track.Artists.Select(artist => artist.Name).ToList()
            );
        }
    }
}
