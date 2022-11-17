namespace NoteOnline.Models
{
    public class Content
    {
        public long id { get; set; }
        public string url { get; set; }
        public string newUrl { get; set; }
        public string note { get; set; }
        public string password { get; set; }
        public bool setPassword { get; set; }
    }
}