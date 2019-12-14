using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ListPLaylistV2.Models.Spotify
{
    public class SpotifyTrack
    {
        public String Name { get; set; }
        public List<String> Artists { get; set; }

        public SpotifyTrack(String name, List<String> artists)
        {
            Name = name;
            Artists = artists;
        }
    }
}
