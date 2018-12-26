using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompileNetwork.ViewModel
{
    public class SubmissionViewModel : RequestStatus
    {
        public Guid SubmissionId { get; set; }
        public Guid UserId { get; set; }
        public Guid ProblemId { get; set; }
        public int Score { get; set; }
        public string Status { get; set; }
        public DateTime SubmissionDateTime { get; set; }
        public string Code { get; set; }
        public int LanguageId { get; set; }
    }
}
