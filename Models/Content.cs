
namespace noteOnlineV01.Models
{
    public class Content
    {
        public long Id { get; set; }
        public string DocumentId { get; set; }
        public string Url { get; set; }
        public string? NewUrl { get; set; }
        public string Note { get; set; }
        public string Password { get; set; }
        public bool SetPassword { get; set; }
    }
}

