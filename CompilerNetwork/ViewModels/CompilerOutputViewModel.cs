using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompileNetwork.ViewModel
{
    public class CompilerOutputViewModel:RequestStatus
    {
        public List<SubmissionProblemTestCaseViewModel> TestcasesResult { get; set; }
    }
}
