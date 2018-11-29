<<<<<<< HEAD
﻿using CodeFreak1.Models;
using System;
=======
﻿using System;
>>>>>>> b613da586f094c46e189695bf71e5ff3e29b931a
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
<<<<<<< HEAD
    public class ProblemViewModel : RequestStatus
    {

=======
    public class ProblemViewModel:RequestStatus
    {
>>>>>>> b613da586f094c46e189695bf71e5ff3e29b931a
        public Guid ProblemId { get; set; }
        public Guid AuthorId { get; set; }
        public int ProblemTypeId { get; set; }
        public int DifficultyId { get; set; }
        public string Description { get; set; }
<<<<<<< HEAD
        public string InputFormat { get; set; }
        public string OutputFormat { get; set; }
        public string ConstraintNote { get; set; }
        public string SampleInput { get; set; }
        public string SampleOutput { get; set; }
=======
>>>>>>> b613da586f094c46e189695bf71e5ff3e29b931a
        public int? MaxScore { get; set; }
        public int NoOfSubmission { get; set; }
        public DateTime? PostDateTime { get; set; }
        public int? NoOfTestCaseFiles { get; set; }
<<<<<<< HEAD

=======
>>>>>>> b613da586f094c46e189695bf71e5ff3e29b931a
    }
}
