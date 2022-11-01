using Microsoft.EntityFrameworkCore;

namespace noteOnlineV01.Models
{
    public class ContentContext :DbContext
    {
        public ContentContext(DbContextOptions<ContentContext> options)
            : base(options)
        { }
        public DbSet<Content> Contents { get; set; }
    }
}
