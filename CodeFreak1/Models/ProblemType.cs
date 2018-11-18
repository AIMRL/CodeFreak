using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class ProblemType
    {
        public ProblemType()
        {
            Problem = new HashSet<Problem>();
        }

        public int ProblemTypeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<Problem> Problem { get; set; }
    }
}
