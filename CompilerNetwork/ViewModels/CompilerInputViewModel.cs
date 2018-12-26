using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompileNetwork.ViewModel
{
    public class CompilerInputViewModel:RequestStatus
    {
        public SubmissionViewModel SubmissionViewModel { get; set; }
        public List<ProblemTestCaseViewModel> ProblemTestCaseViewModels { get; set; }
    }
}
