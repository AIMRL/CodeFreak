using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class DifficultyViewModel:RequestStatus
    {
        public int DifficultyId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
