using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class Problem
    {
        public Problem()
        {
            Comment = new HashSet<Comment>();
            ProblemTestCase = new HashSet<ProblemTestCase>();
            Rating = new HashSet<Rating>();
            Submission = new HashSet<Submission>();
        }

        public Guid ProblemId { get; set; }
        public Guid AuthorId { get; set; }
        public int ProblemTypeId { get; set; }
        public int DifficultyId { get; set; }
        public string Description { get; set; }
        public int? MaxScore { get; set; }
        public int NoOfSubmission { get; set; }
        public DateTime? PostDateTime { get; set; }
        public int? NoOfTestCaseFiles { get; set; }

        public string InputFormat { get; set; }
        public string OutputFormat { get; set; }
        public string ConstraintNote { get; set; }
        public string SampleInput { get; set; }
        public string SampleOutput { get; set; }

        public Users Author { get; set; }
        public Difficulty Difficulty { get; set; }
        public ProblemType ProblemType { get; set; }
        public ICollection<Comment> Comment { get; set; }
        public ICollection<ProblemTestCase> ProblemTestCase { get; set; }
        public ICollection<Rating> Rating { get; set; }
        public ICollection<Submission> Submission { get; set; }
    }
}
