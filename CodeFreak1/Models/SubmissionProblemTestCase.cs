using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class SubmissionProblemTestCase
    {
        public Guid SubmissionProblemTestCaseId { get; set; }
        public Guid SubmissionId { get; set; }
        public Guid ProblemTestCaseId { get; set; }
        public string Status { get; set; }
        public string UserOutputFilePath { get; set; }

        public ProblemTestCase ProblemTestCase { get; set; }
        public Submission Submission { get; set; }
    }
}
