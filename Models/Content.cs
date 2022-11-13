namespace NoteOnline.Models
{
    public class Content
    {
        public long id { get; set; }
        public string Url { get; set; }
        public string Note { get; set; }
        public string Password { get; set; }
        public bool SetPassword { get; set; }
    }
}