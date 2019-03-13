using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class Message
    {
        public int Id { get; set; }
        public string MessageText { get; set; }
        public DateTime? DateOfText { get; set; }
        public Guid? SenderId { get; set; }
        public Guid? RecieverId { get; set; }

        public Users Reciever { get; set; }
        public Users Sender { get; set; }
    }
}
