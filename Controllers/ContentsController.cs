using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NoteOnline.Models;
using NoteOnline.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Dynamic;
using Microsoft.AspNetCore.Http;

namespace NoteOnline.Controllers
{


    [ApiController]
    // [Authorize]
    [Route("api/Notes")]

    public class ContentsController : ControllerBase
    {

        private string _secret = "PDv7DrqznYL6nv7DrqzjnQYO9JxIsWdcjnQYL6nu0f";
        private string _expDate = "144199999";
        private readonly ContentContext _context;

        public ContentsController(ContentContext context)
        {
            _context = context;
        }
        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        #region GET API

        // GET: api/Notes/newPath
        // GET newUrl
        [HttpGet("newPath")]
        public async Task<ActionResult<IEnumerable<Content>>> GetNewPath()
        {
            //create random path
            var newPath = RandomString(8);

            //check note form database
            var noteFromDB = await _context.Contents.FirstOrDefaultAsync(c => c.url.Contains(newPath));

            //loop for findURL not match in database
            while (noteFromDB != null)
            {
                newPath = RandomString(8);
                noteFromDB = await _context.Contents.FirstOrDefaultAsync(c => c.url.Contains(newPath));
            }
            return Ok(new
            {
                Url = newPath
            });
        }

        //GET flow Url
        // GET: api/Notes/URL
        // [Authorize]
        [HttpGet("{Url}")]
        public async Task<ActionResult<Content>> GetContentByUrl(string Url)
        {
            var findURL = await _context.Contents.FirstOrDefaultAsync(c => c.url == (Url));

            bool sessionPasswordFE = HttpContext.Session.GetString("password") == findURL.password;
            bool sessionFE =  HttpContext.Session.GetString($"{Url}") == Url;
            bool isAuthenticated = sessionFE && sessionPasswordFE ;
            if (findURL == null)
            {
                return NotFound();
            }

            var checkSetPassWordOfNoteInDataBase = findURL.setPassword;

            if (!checkSetPassWordOfNoteInDataBase)
            {
                return Ok(findURL);
            }
            else
            {
                if (isAuthenticated)
                {
                    return Ok(findURL);
                }
                else
                {
                    findURL.url = Url + "/login";
                    return Ok(findURL);
                }
            }
        }

        //GET flow Url
        // GET: api/Notes/URL/auth
        [Authorize]
        [HttpGet("{Url}/auth")]
        public async Task<ActionResult<Content>> GetAuth(string Url)
        {
            var findURL = await _context.Contents.FirstOrDefaultAsync(c => c.url == (Url));

            if (findURL == null)
            {
                return NotFound();
            }
            return Ok(findURL);
        }


        //GET share
        // GET: api/Notes/URL

        [HttpGet("{Url}/Share")]
        public async Task<ActionResult<Content>> GetShare(string Url)
        {
            var findURL = await _context.Contents.FirstOrDefaultAsync(c => c.url.Contains(Url));

            if (findURL == null)
            {
                return NotFound();
            }
            return Ok(findURL);

        }

        // // GET: api/Notes
        // // GET all Note in database
        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<Content>>> GetContents()
        // {
        //     return await _context.Contents.ToListAsync();
        // }

        #endregion

        #region UPDATE API

        // PUT /api/notes/update/Url
        // update NOTE content
        [HttpPut("{Url}")]
        public async Task<IActionResult> PutUpdate(Content content)
        {
            var exit = await _context.Contents.FirstOrDefaultAsync(c => c.url.Contains(content.url));

            if (exit == null)
            {
                //Create new Content if URL not exits in database
                _context.Contents.Add(content);
                try
                {
                    await _context.SaveChangesAsync();
                    return Ok(content);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ContentExists(content.url))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            else
            {
                //Update new Content if URL exits  in database    
                exit.id = content.id;
                _context.Entry(exit).CurrentValues.SetValues(content);
                // _context.Contents.Update(exit);
                try
                {
                    await _context.SaveChangesAsync();
                    return Ok(exit);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ContentExists(content.url))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
        }


        // Patch /api/notes/Url/Url
        // update UpdateUrl
        [HttpPatch("{Url}/Url")]
        public async Task<IActionResult> UpdateUrl(string url, Content content)
        {
            var exit = await _context.Contents.FirstOrDefaultAsync(c => c.url.Contains(url));
            var ExitNewUrl = await _context.Contents.FirstOrDefaultAsync(c => c.url.Contains(content.newUrl));

            if (exit == null)
            {
                //Create new Content if URL not exits in database
                content.url = content.newUrl;
                content.newUrl = null;
                _context.Contents.Add(content);
                try
                {
                    await _context.SaveChangesAsync();
                    return Ok(content);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ContentExists(content.url))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            if (ExitNewUrl == null)
            {
                //Create new Content if newUrl not exits in database
                content.url = content.newUrl;
                content.newUrl = null;
                _context.Contents.Add(content);
                try
                {
                    await _context.SaveChangesAsync();
                    return Ok(content);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ContentExists(content.url))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }

            else
            {
                return BadRequest(new
                {
                    Url = exit.url,
                    use = true
                });
            }
        }

        #endregion

        #region API Password

        // PUT /api/notes/Url/password
        // update password and send token to FE
        [HttpPatch("{Url}/password")]
        public async Task<IActionResult> UpdatePassword(string url, Content content)
        {
            var exit = await _context.Contents.FirstOrDefaultAsync(c => c.url == (url));

            // note not saved in the database
            if (exit == null)
            {
                _context.Add(content);
                try
                {
                    await _context.SaveChangesAsync();
                    HttpContext.Session.SetString($"{url}", $"{url}");
                    HttpContext.Session.SetString("password", $"{content.password}");
                    return Ok(content);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ContentExists(content.url))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }

            if (exit.setPassword)
            {
                // set password client send to DB
                exit.setPassword = content.setPassword;
                exit.password = content.password;
                _context.Update(exit);

                try
                {
                    await _context.SaveChangesAsync();
                    HttpContext.Session.SetString($"{url}", $"{url}");
                    HttpContext.Session.SetString("password", $"{content.password}");
                    return Ok(content);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ContentExists(content.url))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

            }

            // trường hợp này có thể thừa
            // lúc get note về  thì nếu có mật khẩu sẽ xuất hiện loggin
            if (exit.password == content.password)
            {
                try
                {
                    await _context.SaveChangesAsync();
                    return Ok(content);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ContentExists(content.url))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            // trường hợp này có thể thừa
            // Change old password to new password
            if (exit.password != content.password)
            {
                exit.password = content.password;
                exit.setPassword = content.setPassword;

                try
                {
                    await _context.SaveChangesAsync();
                    HttpContext.Session.SetString($"{url}", $"{url}");
                    HttpContext.Session.SetString("password", $"{content.password}");
                    return Ok(exit);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ContentExists(content.url))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }

            return BadRequest();

        }

        // PATCH /api/notes/Url/check-password
        // login page: send password from FE to BE check
        [HttpPatch("{Url}/check-password")]
        public async Task<IActionResult> CheckPassword(string url, Content content)
        {
            var exit = await _context.Contents.FirstOrDefaultAsync(c => c.url == (url));

            if (exit == null)
            {
                return BadRequest();
            }

            if (exit.password == content.password)
            {
                HttpContext.Session.SetString($"{url}", $"{url}");
                HttpContext.Session.SetString("password", $"{content.password}");
                return Ok(exit);
            }
            else
            {
                return BadRequest(new { MatchPass = false });
            }

        }

        // PATCH /api/notes/Url/reset-password
        // login page: send password from FE to BE check
        [HttpPatch("{Url}/reset-password")]
        public async Task<IActionResult> ResetPassword(string url)
        {
            var exit = await _context.Contents.FirstOrDefaultAsync(c => c.url.Contains(url));

            if (exit == null)
            {
                return BadRequest();
            }

            if (exit.setPassword)
            {
                exit.setPassword = false;
                exit.password = null;
                HttpContext.Session.Remove($"{url}");
                HttpContext.Session.Remove("password");
                
                _context.Contents.Update(exit);
                await _context.SaveChangesAsync();
                return Ok(exit);
            }
            else
            {
                return BadRequest();
            }

        }


        #endregion
        // DELETE: api/Notes/delete/url
        [HttpDelete("{Url}")]
        public async Task<ActionResult<Content>> DeleteContent(string Url)
        {
            var content = await _context.Contents.FirstOrDefaultAsync(c => c.url.Contains(Url));
            if (content == null)
            {
                return NotFound();
            }

            _context.Contents.Remove(content);
            await _context.SaveChangesAsync();

            return content;
        }

        private bool ContentExists(string Url)
        {
            return _context.Contents.Any(e => e.url == Url);
        }
    }
}
