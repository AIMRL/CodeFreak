using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class Rating
    {
        public Guid RatingId { get; set; }
        public Guid UserId { get; set; }
        public Guid ProblemId { get; set; }
        public int Rate { get; set; }
        public int TotalRate { get; set; }
        public DateTime RateDateTime { get; set; }

        public Problem Problem { get; set; }
        public Users User { get; set; }
    }
}
