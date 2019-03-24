using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class MessageReturnViewModel:RequestStatus
    {
        public List<MessageCompleteViewModel> Message_list { get; set; }
        public string currentUserId { get; set; }
        public MessageReturnViewModel()
        {
            this.Message_list = new List<MessageCompleteViewModel>();
        }

    }
}
