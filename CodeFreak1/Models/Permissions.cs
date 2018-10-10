using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class Permissions
    {
        public Permissions()
        {
            PermissionsMapping = new HashSet<PermissionsMapping>();
        }

        public int PermissionId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public Guid? Modifiedby { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool? IsActive { get; set; }

        public virtual Users ModifiedbyNavigation { get; set; }
        public virtual ICollection<PermissionsMapping> PermissionsMapping { get; set; }
    }
}
