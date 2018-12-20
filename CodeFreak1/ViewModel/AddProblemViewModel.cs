using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class AddProblemViewModel
    {
        public ProblemTypeViewModel Problem { get; set; }
        public EditorialViewModel Editorial { get; set; }
        public List<ProblemTestCaseViewModel> TestFiles { get; set; }
    }
}
