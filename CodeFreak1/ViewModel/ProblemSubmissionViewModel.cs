using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class ProblemSubmissionViewModel : RequestStatus
    {
        public string Title { get; set; }
        public int Score { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
    }
}
