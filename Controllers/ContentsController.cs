using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using noteOnlineV01.Models;

namespace noteOnlineV01.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Content>>> GetContents()
        {
            return await _context.Contents.ToListAsync();
        }

        // GET: api/Contents/5
        [HttpGet("{Id}")]
        public async Task<ActionResult<Content>> GetContent(long Id)
        {
            var content = await _context.Contents.FindAsync(Id);

            if (content == null)
            {
                return NotFound();
            }

            return content;
        }

        // GET: api/Contents
        [HttpGet("Url/{Url}")]
        public async Task<ActionResult<Content>> GetContentByLink(string Url)
        {
            
            var findURL = from b in _context.Contents
                          where b.Url.Contains(Url)
                          select b;
            await _context.Contents.FirstOrDefaultAsync(c => c.Url.Contains(Url));

            if (findURL == null)
            {
                return NotFound();
            }

            return Ok(findURL);

            
        }


        // PUT: api/Contents/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContent(long Id, Content content)
        {
            if (Id != content.Id)
            {
                return BadRequest();
            }

            _context.Entry(content).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContentExists(Id))
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

        // POST: api/Contents
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Content>> PostContent(Content content)
        {
            _context.Contents.Add(content);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContent", new { Id = content.Id }, content);
        }

        // DELETE: api/Contents/
        [HttpDelete("{Id}")]
        public async Task<ActionResult<Content>> DeleteContent(long Id)
        {
            var content = await _context.Contents.FindAsync(Id);
            if (content == null)
            {
                return NotFound();
            }

            _context.Contents.Remove(content);
            await _context.SaveChangesAsync();

            return content;
        }

        private bool ContentExists(long Id)
        {
            return _context.Contents.Any(e => e.Id == Id);
        }
    }
}
