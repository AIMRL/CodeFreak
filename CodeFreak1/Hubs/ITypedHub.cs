using CodeFreak1.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.Hubs
{
    public interface ITypedHub
    {

        Task BroadcastMessage(string message);
        Task OnConnected();
        Task recieveMessage(MessageViewModel msg);

    }
}
