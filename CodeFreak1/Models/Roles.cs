using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class Roles
    {
        public Roles()
        {
            PermissionsMapping = new HashSet<PermissionsMapping>();
            UserRoles = new HashSet<UserRoles>();
        }

        public int RoleId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool? IsActive { get; set; }
        public Guid? ModifiedBy { get; set; }
        public Guid? CreatedBy { get; set; }

        public Users ModifiedByNavigation { get; set; }
        public ICollection<PermissionsMapping> PermissionsMapping { get; set; }
        public ICollection<UserRoles> UserRoles { get; set; }
    }
}
