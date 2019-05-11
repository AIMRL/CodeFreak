using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class Files
    {
        public Guid FileId { get; set; }
        public Guid UserId { get; set; }
        public string FilePath { get; set; }
        public int? Size { get; set; }
        public string Extention { get; set; }

        public Users User { get; set; }
    }
}
