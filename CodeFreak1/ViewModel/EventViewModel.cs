using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class EventViewModel:RequestStatus
    {
        public int EventId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public DateTime ApplyingLastDate { get; set; }
        public DateTime? CreatedOn { get; set; }
        public Guid CreatedBy { get; set; }
        public bool IsActive { get; set; }
    }
}
