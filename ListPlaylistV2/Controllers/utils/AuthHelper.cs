using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ListPLaylistV2.Controllers.utils
{
    public static class AuthHelper
    {
        /// <summary>
        /// Returns Tuple. Item1 - tokenType, Item2 - accessToken.
        /// </summary>
        /// <param name="Authorization"></param>
        /// <returns></returns>
        public static Tuple<string, string> GetAuthSeparated(String Authorization)
        {
            int separatorIndex = Authorization.IndexOf(' ');
            string tokenType = Authorization.Substring(0, separatorIndex);
            string accessToken = Authorization.Substring(separatorIndex + 1);

            return new Tuple<string, string>(tokenType, accessToken);
        }
    }
}
