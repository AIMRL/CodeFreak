using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class EventPerformanceViewModel:RequestStatus
    {
        public UsersViewModel User { get; set; }
        public FileViewModel UserImage { get; set; }
        public List<SubmissionViewModel> Submissions { get; set; }
        public int NoOfSubmissions { get; set; }
        public int TotalScore { get; set; }
        public int Position { get; set; }

    }
}
