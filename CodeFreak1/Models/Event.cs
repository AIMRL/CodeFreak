using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class Event
    {
        public Event()
        {
            EventProblems = new HashSet<EventProblems>();
            EventUsers = new HashSet<EventUsers>();
        }

        public int EventId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public DateTime ApplyingLastDate { get; set; }
        public DateTime? CreatedOn { get; set; }
        public Guid CreatedBy { get; set; }
        public bool IsActive { get; set; }

        public Users CreatedByNavigation { get; set; }
        public ICollection<EventProblems> EventProblems { get; set; }
        public ICollection<EventUsers> EventUsers { get; set; }
    }
}
