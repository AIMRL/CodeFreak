using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class ProblemTestCase
    {
        public ProblemTestCase()
        {
            SubmissionProblemTestCase = new HashSet<SubmissionProblemTestCase>();
        }

        public Guid ProblemTestCaseId { get; set; }
        public Guid ProblemId { get; set; }
        public string InputFilePath { get; set; }
        public string OutputFilePath { get; set; }
        public int? SizeInputFile { get; set; }
        public int? SizeOutputFile { get; set; }

        public Problem Problem { get; set; }
        public ICollection<SubmissionProblemTestCase> SubmissionProblemTestCase { get; set; }
    }
}
