using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{

    public class MessageViewModel
    {
        public string Id { get; set; }
        public string MessageText { get; set; }
        public string SenderId { get; set; }
        public string RecieverId { get; set; }
        public DateTime DateOfText { get; set; }

    }
}
