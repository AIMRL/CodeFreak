using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class Users
    {
        public Users()
        {
            Comment = new HashSet<Comment>();
            Connection = new HashSet<Connection>();
            Editorial = new HashSet<Editorial>();
            Permissions = new HashSet<Permissions>();
            Problem = new HashSet<Problem>();
            Rating = new HashSet<Rating>();
            Roles = new HashSet<Roles>();
            Submission = new HashSet<Submission>();
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
        public DateTime? DateOfBirth { get; set; }

        public ICollection<Comment> Comment { get; set; }
        public ICollection<Connection> Connection { get; set; }
        public ICollection<Editorial> Editorial { get; set; }
        public ICollection<Permissions> Permissions { get; set; }
        public ICollection<Problem> Problem { get; set; }
        public ICollection<Rating> Rating { get; set; }
        public ICollection<Roles> Roles { get; set; }
        public ICollection<Submission> Submission { get; set; }
        public ICollection<UserRoles> UserRoles { get; set; }
    }
}
