using NoteOnline.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;

namespace NoteOnline.Controllers
{
    
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private IConfiguration _config;

        public TokenController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet]
        public string GetRandomToken()
        {
            var jwt = new JwtService(_config);
            var token = jwt.GenerateSecurityToken("fake@email.com");
            return token;
        }
       
       //GET: api/token/:url/jwt
        [HttpGet("{Url}/jwt")]
        public IActionResult GetEditNoteStatus()
        {
           
            return new JsonResult( new { edit = true});
        }
    }
}