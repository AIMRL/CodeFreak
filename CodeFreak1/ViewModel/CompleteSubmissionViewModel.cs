using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class CompleteSubmissionViewModel:RequestStatus
    {
        public SubmissionViewModel Submission { get; set; }
        public UsersViewModel User { get; set; }
        public ProblemViewModel Problem { get; set; }
        public ProgrammingLanguageViewModel Language { get; set; }
        public FileViewModel UserImage { get; set; }
    }
}
