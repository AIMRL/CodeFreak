using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class ProblemTestCaseViewModel
    {
        public Guid ProblemTestCaseId { get; set; }
        public Guid ProblemId { get; set; }
        public string InputFilePath { get; set; }
        public string OutputFilePath { get; set; }
        public int? SizeInputFile { get; set; }
        public int? SizeOutputFile { get; set; }

        public IFormFile InputFile { get; set; }
        public IFormFile outFile { get; set; }
    }
}
