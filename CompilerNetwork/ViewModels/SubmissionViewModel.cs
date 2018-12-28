using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompileNetwork.ViewModel
{
    public class SubmissionViewModel : RequestStatus
    {
        public string SubmissionId { get; set; }
        public string UserId { get; set; }
        public string ProblemId { get; set; }
        public int Score { get; set; }
        public string Status { get; set; }
        public DateTime SubmissionDateTime { get; set; }
        public string Code { get; set; }
        public int LanguageId { get; set; }
    }
}
