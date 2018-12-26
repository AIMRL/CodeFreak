using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class SubmissionProblemTestCaseViewModel
    {
        public Guid SubmissionProblemTestCaseId { get; set; }
        public Guid SubmissionId { get; set; }
        public Guid ProblemTestCaseId { get; set; }
        public string Status { get; set; }
        public string UserOutputFilePath { get; set; }
    }
}
