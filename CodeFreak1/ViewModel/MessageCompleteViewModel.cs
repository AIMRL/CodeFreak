using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class MessageCompleteViewModel
    {
        public MessageViewModel message { get; set; }
        public UsersViewModel sender { get; set; }
        public UsersViewModel reciever { get; set; }
        public string currentUserId { get; set; }

    }
}
