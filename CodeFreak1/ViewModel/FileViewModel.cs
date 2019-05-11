using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class FileViewModel:RequestStatus
    {
        public Guid FileId { get; set; }
        public Guid UserId { get; set; }
        public string FilePath { get; set; }
        public int? Size { get; set; }
        public string Extention { get; set; }
    }
}
