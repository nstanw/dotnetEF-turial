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

        //GET NOTE follow url
        // GET: api/Contents/Url
        [HttpGet("{Url}")]
        public async Task<ActionResult<Content>> GetContentByLink(string Url)
        {
            var findURL = await _context.Contents.FirstOrDefaultAsync(c => c.Url.Contains(Url));

            if (findURL == null)
            {
                return NotFound();
            }
            return Ok(findURL);
        }

        //Update NOTE
        // PUT: api/Contents/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{Url}")]
        public async Task<IActionResult> PutContent(string Url, Content content)
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

            NoteFromDb.Note = content.Note;
            NoteFromDb.Password = content.Password;
            NoteFromDb.SetPassword = content.SetPassword;
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


        //Change URL
        // PATCH: api/Contents/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPatch("{Url}")]
        public async Task<IActionResult> PatchContent(string Url, Content content)
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

        // GET: api/Contents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Content>>> GetContents()
        {
            return await _context.Contents.ToListAsync();
        }

        // DELETE: api/Contents/
        [HttpDelete("{Url}")]
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
