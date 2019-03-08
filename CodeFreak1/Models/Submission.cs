using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class Submission
    {
        public Submission()
        {
            SubmissionProblemTestCase = new HashSet<SubmissionProblemTestCase>();
        }

        public Guid SubmissionId { get; set; }
        public Guid UserId { get; set; }
        public Guid ProblemId { get; set; }
        public int Score { get; set; }
        public string Status { get; set; }
        public DateTime SubmissionDateTime { get; set; }
        public string Code { get; set; }
        public int LanguageId { get; set; }
        public int? EventId { get; set; }

        public ProgrammingLanguage Language { get; set; }
        public Problem Problem { get; set; }
        public Users User { get; set; }
        public ICollection<SubmissionProblemTestCase> SubmissionProblemTestCase { get; set; }
    }
}