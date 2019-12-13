using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Google.Apis.Services;
using Google.Apis.Upload;
using Google.Apis.Util.Store;
using Google.Apis.YouTube.v3;
using Google.Apis.YouTube.v3.Data;

namespace ListPLaylistV2.Controllers.Google
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleController : ControllerBase
    {
        
        [HttpGet]
        public String GetTest()
        {
            return "Test";
            
        }
    }
}