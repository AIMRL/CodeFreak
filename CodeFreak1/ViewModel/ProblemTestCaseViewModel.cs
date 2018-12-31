using CodeFreak1.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class ProblemTestCaseViewModel
    {
        public string ProblemTestCaseId { get; set; }
        public string ProblemId { get; set; }
        public string InputFilePath { get; set; }
        public string OutputFilePath { get; set; }
        public int? SizeInputFile { get; set; }
        public int? SizeOutputFile { get; set; }
    }
}
