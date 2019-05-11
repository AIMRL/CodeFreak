using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class EventProblems
    {
        public Guid EventProblemId { get; set; }
        public int EventId { get; set; }
        public Guid ProblemId { get; set; }

        public Event Event { get; set; }
        public Problem Problem { get; set; }
    }
}
