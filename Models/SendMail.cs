namespace sendMail.Models
{
    public class SendMail
    {
        internal string host;
        internal int port;

        public string SMTPhost { get; set; }
        public int Port { get; set; }
        public bool UseSsl { get; set; }
        public bool UseDefaultCredentials { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string From { get; set; }
        public string To { get; set; }
    }
}
