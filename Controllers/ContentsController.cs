using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteOnline.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoteOnline.Controllers
{
    [ApiController]
    [Route("api/Notes")]

    public class ContentsController : ControllerBase
    {
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
        [HttpGet("{Url}")]
        public async Task<ActionResult<Content>> GetContentByUrl(string Url)
        {
            var findURL = await _context.Contents.FirstOrDefaultAsync(c => c.url.Contains(Url));

            if (findURL == null)
            {
                return NotFound();
            }

            var checkSetPassWordOfNoteInDataBase = findURL.setPassword;
            if (checkSetPassWordOfNoteInDataBase)
            {
                var needPassWord = new
                {
                    //return status set password for check FE
                    SetPassword = findURL.setPassword,
                    Url = findURL.url,
                };
                return Ok(needPassWord);
            }
            else
            {
                return Ok(findURL);
            }
        }

        // GET: api/Notes
        // GET all Note in database
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Content>>> GetContents()
        {
            return await _context.Contents.ToListAsync();
        }

        #endregion

        #region UPDATE API

        // PUT /api/notes/update
        // update NOTE content
        [HttpPut("UPDATE")]
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
                exit.note = content.note;
                exit.password = content.password;
                exit.setPassword = content.setPassword;
                exit.url = content.url;
                exit.newUrl = content.newUrl;

                _context.Contents.Update(exit);
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


        // PUT /api/notes/UpdatePassword
        // update UpdateUrl
        [HttpPut("UpdateUrl")]
        public async Task<IActionResult> UpdateUrl(Content content)
        {
            var exit = await _context.Contents.FirstOrDefaultAsync(c => c.url.Contains(content.url));

            if (exit == null)
            {
                //Create new Content if URL not exits in database
                content.url = content.newUrl;
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
                exit.note = content.note;
                exit.password = content.password;
                exit.setPassword = content.setPassword;
                exit.url =content.newUrl;
                exit.newUrl = content.newUrl;

                _context.Contents.Update(exit);
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



        #endregion


        // DELETE: api/Notes/delete/url
        [HttpDelete("delete/{Url}")]
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
