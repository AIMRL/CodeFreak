using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class UserRoles
    {
        public int UserRoleId { get; set; }
        public Guid UserId { get; set; }
        public int RoleId { get; set; }

        public Roles Role { get; set; }
        public Users User { get; set; }
    }
}
