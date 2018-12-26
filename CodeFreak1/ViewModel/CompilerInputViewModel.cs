using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class CompilerInputViewModel
    {
        public SubmissionViewModel SubmissionViewModel { get; set; }
        public List<ProblemTestCaseViewModel> ProblemTestCaseViewModels { get; set; }
    }
}
