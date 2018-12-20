using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class ProblemCompleteViewModel: RequestStatus
    {
        public ProblemViewModel Problem { get; set; }
        public ProblemTypeViewModel ProblemType { get; set; }
        public DifficultyViewModel Difficulty { get; set; }
    }
}
