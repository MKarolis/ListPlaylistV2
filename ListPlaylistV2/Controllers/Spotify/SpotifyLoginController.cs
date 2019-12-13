using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.Extensions;

namespace dotnet_core_spotify_authentication.Controllers
{
    class SpotifyAuthentication
    {
        public string clientID = "884ddd50210b402599019f2caa3c0eb7";
        public string clientSecret = "a67d3cd31a2d4874930516d56c1eaf9b";
        public string redirectURL = "https://localhost:44339/convert";
    }

    [Route("api/v1/spotify/login/")]
    public class SpotifyController : Controller
    {
        SpotifyAuthentication sAuth = new SpotifyAuthentication();

        [HttpGet("/ffffff")]
        public ContentResult Get()
        {
            var qb = new QueryBuilder();
            qb.Add("response_type", "code");
            qb.Add("client_id", sAuth.clientID);
            qb.Add("scope", "user-read-private " +
                            "user-read-email " +
                            "playlist-read-private" +
                            "playlist-read-collaborative " + // User's playlist, editable publicly
                            "playlist-modify-private " + 
                            "playlist-modify-public ");
            qb.Add("redirect_uri", sAuth.redirectURL);

            //reiktu pridet anchor prie spotify-login btn
            //<a href="https://accounts.spotify.com/authorize/" + qb.ToQueryString().ToString() + @"""><button>Authenticate at Spotify</button></a>
            return new ContentResult
            {
                ContentType = "application/json",
                //mum reik kad grazintu content stringa, ir mes ji idetume i href
                Content = "https://accounts.spotify.com/authorize/" + qb.ToQueryString().ToString() + @""
            };
        }

        [Route("/callback")]
        public ContentResult Get(string code)
        {
            string responseString = "";

            if (code.Length > 0)
            {
                using (HttpClient client = new HttpClient())
                {
                    Console.WriteLine(Environment.NewLine + "Your basic bearer: " + Convert.ToBase64String(System.Text.ASCIIEncoding.ASCII.GetBytes(sAuth.clientID + ":" + sAuth.clientSecret)));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(System.Text.ASCIIEncoding.ASCII.GetBytes(sAuth.clientID + ":" + sAuth.clientSecret)));

                    FormUrlEncodedContent formContent = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("code", code),
                        new KeyValuePair<string, string>("redirect_uri", sAuth.redirectURL),
                        new KeyValuePair<string, string>("grant_type", "authorization_code"),
                    });

                    var response = client.PostAsync("https://accounts.spotify.com/api/token", formContent).Result;

                    var responseContent = response.Content;
                    responseString = responseContent.ReadAsStringAsync().Result;
                }
            }

            return new ContentResult
            {
                ContentType = "application/json",
                Content = responseString
            };
        }
    }
}
