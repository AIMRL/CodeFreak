using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class ProblemUserCodeViewModel
    {
        public string Code { get; set; }
        public string userId { get; set; }
        public string problemId { get; set; }
        public bool isEvent { get; set; }
        public int eventId { get; set; }
    }
}
