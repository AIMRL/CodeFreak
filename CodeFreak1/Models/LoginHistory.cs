using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class LoginHistory
    {
        public long LoginHistoryId { get; set; }
        public Guid UserId { get; set; }
        public string LoginId { get; set; }
        public string MachineIp { get; set; }
        public DateTime LoginTime { get; set; }
    }
}
