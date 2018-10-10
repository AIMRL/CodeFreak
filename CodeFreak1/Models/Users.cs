using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class Users
    {
        public Users()
        {
            Permissions = new HashSet<Permissions>();
            Roles = new HashSet<Roles>();
            UserRoles = new HashSet<UserRoles>();
        }

        public Guid UserId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool? IsActive { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? ModifieBy { get; set; }

        public virtual ICollection<Permissions> Permissions { get; set; }
        public virtual ICollection<Roles> Roles { get; set; }
        public virtual ICollection<UserRoles> UserRoles { get; set; }
    }
}
