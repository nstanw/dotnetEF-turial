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
    [Route("api/[controller]")]

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

        // GET: api/Contents
        // GET all Note
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Content>>> GetHome()
        {
            var newURL = RandomString(8);
            var noteFromDB = await _context.Contents.FirstOrDefaultAsync(c => c.Url.Contains(newURL));
            while (noteFromDB != null)
            {
                newURL = RandomString(8);
                noteFromDB = await _context.Contents.FirstOrDefaultAsync(c => c.Url.Contains(newURL));
            }
            return Ok(new { Url = newURL });
        }

        //GET flow Url
        // GET: api/Contents/Url
        [HttpGet("{Url}")]
        public async Task<ActionResult<Content>> GetContentByLink(string Url)
        {
            var findURL = await _context.Contents.FirstOrDefaultAsync(c => c.Url.Contains(Url));

            if (findURL == null)
            {
                return NotFound();
            }

            var checkSetPassWord = findURL.SetPassword;
            if (checkSetPassWord)
            {
                var needPassWord = new
                {
                    SetPassword = findURL.SetPassword,
                    Url = findURL.Url,
                };
                return Ok(needPassWord);
            }
            else
            {
                return Ok(findURL);
            }
        }

        // GET: api/Contents
        // GET all Note
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Content>>> GetContents()
        {
            return await _context.Contents.ToListAsync();
        }

        #region API change 
        //ADD Note
        // POST: api/Contents
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Content>> PostContent(Content content)
        {
            _context.Contents.Add(content);
            await _context.SaveChangesAsync();

            return Ok(content);
        }

        //Login PassWord
        // POST: api/Contents
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpGet("login")]
        public async Task<ActionResult<Content>> PostLogin(string Url, string Password)
        {
            //Console.WriteLine(Url, Password);
            var findNoteMatchURL = await _context.Contents.FirstOrDefaultAsync(c => c.Url.Contains(Url));

            if (findNoteMatchURL == null)
            {
                return NotFound();
            }

            // check pass
            var checkMatchPassword = (findNoteMatchURL.Password == Password);
            if (checkMatchPassword)
            {
                return Ok();
            }

            return BadRequest();
        }

        //Update/create NOTE
        // PUT: api/Contents/
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut]
        public async Task<IActionResult> PutContent(Content content)
        {

            var NoteFromDb = await _context.Contents.FirstOrDefaultAsync(c => c.Url.Contains(content.Url));


            if (content.newUrl != null)
            {
                content.Url = content.newUrl;
            }

            if (NoteFromDb == null)
            {
                _context.Contents.Add(content);
                try
                {
                    await _context.SaveChangesAsync();
                    return Ok(content);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ContentExists(content.Url))
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
                NoteFromDb.Note = content.Note;
                NoteFromDb.Password = content.Password;
                NoteFromDb.SetPassword = content.SetPassword;
                NoteFromDb.Url = content.Url;

                _context.Contents.Update(NoteFromDb);
                try
                {
                    await _context.SaveChangesAsync();
                    return Ok(NoteFromDb);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ContentExists(content.Url))
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

        //Change URL
        // PATCH: api/Contents/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPatch("{Url}")]
        public async Task<IActionResult> PatchContent(string Url, Content content)
        {
            Console.Write(Url, content);
            var NoteFromDb = await _context.Contents.FirstOrDefaultAsync(c => c.Url.Contains(Url));

            if (NoteFromDb == null)
            {
                return NotFound();
            }

            if (Url != NoteFromDb.Url)
            {
                return BadRequest();
            }

            NoteFromDb.Url = content.Url;

            _context.Contents.Update(NoteFromDb);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContentExists(Url))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // SetPassWord
        // PATCH: api/Contents/password
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPatch("password")]
        public async Task<IActionResult> PatchPassword(string Url, string Password)
        {
            var NoteFromDb = await _context.Contents.FirstOrDefaultAsync(c => c.Url.Contains(Url));

            if (NoteFromDb == null)
            {
                return NotFound();
            }

            if (Url != NoteFromDb.Url)
            {
                return BadRequest();
            }

            var checkSetPassWork = NoteFromDb.SetPassword;
            if (checkSetPassWork)
            {
                return BadRequest();
            }
            else
            {
                NoteFromDb.Password = Password;
                NoteFromDb.SetPassword = true;
                _context.Contents.Update(NoteFromDb);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContentExists(Url))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        //RemovePassword
        // PATCH: api/Contents/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPatch("remove")]
        public async Task<IActionResult> PatchRemovePassword(string Url, bool RemovePassword)
        {
            var NoteFromDb = await _context.Contents.FirstOrDefaultAsync(c => c.Url.Contains(Url));

            if (NoteFromDb == null)
            {
                return NotFound();
            }

            if (Url != NoteFromDb.Url)
            {
                return BadRequest();
            }

            var checkPasswordIsSet = NoteFromDb.SetPassword;
            if (checkPasswordIsSet)
            {
                NoteFromDb.SetPassword = false;
                _context.Contents.Update(NoteFromDb);
            }
            else
            {
                return BadRequest();
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContentExists(Url))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        #endregion


        // DELETE: api/Contents/
        [HttpDelete("{Id}")]
        public async Task<ActionResult<Content>> DeleteContent(string Url)
        {
            var content = await _context.Contents.FirstOrDefaultAsync(c => c.Url.Contains(Url));
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
            return _context.Contents.Any(e => e.Url == Url);
        }
    }
}
