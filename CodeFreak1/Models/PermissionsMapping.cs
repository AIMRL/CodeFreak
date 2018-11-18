using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class PermissionsMapping
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public int PermissionId { get; set; }

        public Permissions Permission { get; set; }
        public Roles Role { get; set; }
    }
}
