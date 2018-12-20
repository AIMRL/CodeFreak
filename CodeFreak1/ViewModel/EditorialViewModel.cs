using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class EditorialViewModel
    {
        public Guid EditorialId { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public int LanguageId { get; set; }
        public Guid ProblemId { get; set; }
        public Guid UserId { get; set; }

        public IFormFile InputFile { get; set; }
        public IFormFile outFile { get; set; }
    }
}
