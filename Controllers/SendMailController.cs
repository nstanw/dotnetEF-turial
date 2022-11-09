using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Mail;
using System.Threading.Tasks;
using Test.Models;

namespace Test.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SendMailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<SendMail>> PostMail(SendMail sendMail)
        {
            Console.WriteLine(sendMail);

            string SMTPhost = sendMail.SMTPhost;
            int Port = sendMail.Port;
            string Password = sendMail.Password;
            string Email = sendMail.Email;
            string From = sendMail.From;
            string To = sendMail.To;
            bool UseSsl = sendMail.UseSsl;
            bool UseDefaultCredentials = sendMail.UseDefaultCredentials;

            try
            {
                SmtpClient smtpClient = new SmtpClient(SMTPhost, Port);

                smtpClient.UseDefaultCredentials = UseDefaultCredentials; // uncomment if you don't want to use the network credentials
                smtpClient.Credentials = new System.Net.NetworkCredential(Email, Password);
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.EnableSsl = UseSsl;
                MailMessage mail = new MailMessage();

                //Setting From , To and CC
                mail.From = new MailAddress(From, "SMTP server");
                mail.To.Add(new MailAddress(To));
                smtpClient.Send(mail);

                return Ok(mail);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    error = ex
                });

            }

        }
    }
}