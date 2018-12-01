
﻿using CodeFreak1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class ProblemViewModel : RequestStatus
    {
        public Guid ProblemId { get; set; }
        public Guid AuthorId { get; set; }
        public int ProblemTypeId { get; set; }
        public int DifficultyId { get; set; }
        public string Description { get; set; }
        public string InputFormat { get; set; }
        public string OutputFormat { get; set; }
        public string ConstraintNote { get; set; }
        public string SampleInput { get; set; }
        public string SampleOutput { get; set; }
        public int? MaxScore { get; set; }
        public int NoOfSubmission { get; set; }
        public DateTime? PostDateTime { get; set; }
        public int? NoOfTestCaseFiles { get; set; }
    }
}
