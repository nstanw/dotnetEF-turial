using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace NoteOnline.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        
        public async Task SendPrivateMessage(string url, string note)
        {
            await Clients.User(url).SendAsync("Receivenote", note);
        }
    }
}