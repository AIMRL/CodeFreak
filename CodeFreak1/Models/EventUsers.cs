using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class EventUsers
    {
        public EventUsers()
        {
            EventUserRoles = new HashSet<EventUserRoles>();
        }

        public Guid EventUserId { get; set; }
        public int EventId { get; set; }
        public Guid UserId { get; set; }

        public Event Event { get; set; }
        public Users User { get; set; }
        public ICollection<EventUserRoles> EventUserRoles { get; set; }
    }
}
