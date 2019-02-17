using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class EventUserViewModel:RequestStatus
    {
        public EventViewModel Event { get; set; }
        public UsersViewModel User { get; set; }
    }
}
