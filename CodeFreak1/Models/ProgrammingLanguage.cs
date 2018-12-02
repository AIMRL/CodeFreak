using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class ProgrammingLanguage
    {
        public ProgrammingLanguage()
        {
            Editorial = new HashSet<Editorial>();
            Submission = new HashSet<Submission>();
        }

        public int LanguageId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }

        public ICollection<Editorial> Editorial { get; set; }
        public ICollection<Submission> Submission { get; set; }
    }
}
