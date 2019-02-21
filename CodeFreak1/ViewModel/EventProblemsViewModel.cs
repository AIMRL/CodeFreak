using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class EventProblemsViewModel:RequestStatus
    {
        public Guid EventProblemId { get; set; }
        public int EventId { get; set; }
        public Guid ProblemId { get; set; }
    }
}
