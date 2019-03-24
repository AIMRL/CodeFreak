using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class Connection
    {
        public string ConnectionId { get; set; }
        public bool Connected { get; set; }
        public Guid? UserId { get; set; }

        public Users User { get; set; }
    }
}
