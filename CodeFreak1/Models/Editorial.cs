using System;
using System.Collections.Generic;

namespace CodeFreak1.Models
{
    public partial class Editorial
    {
        public Guid EditorialId { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public int LanguageId { get; set; }
        public Guid ProblemId { get; set; }
        public Guid UserId { get; set; }

        public ProgrammingLanguage Language { get; set; }
        public Problem Problem { get; set; }
        public Users User { get; set; }
    }
}
