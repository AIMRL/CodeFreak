using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class EventUserRoles
    {
        public Guid EventUserRoleId { get; set; }
        public Guid EventUserId { get; set; }
        public int RoleId { get; set; }

        public EventUsers EventUser { get; set; }
        public Roles Role { get; set; }
    }
}
