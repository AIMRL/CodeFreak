using CodeFreak1.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.Models
{
    public class ProblemConversion
    {
        public ProblemViewModel ToViewModel(Problem problem)
        {
            ProblemViewModel problemViewModel = new ProblemViewModel();

            problemViewModel.ProblemTypeId = problem.ProblemTypeId;
            problemViewModel.AuthorId = problem.AuthorId;

            problemViewModel.InputFormat = problem.InputFormat;

            problemViewModel.OutputFormat = problem.OutputFormat;
            problemViewModel.SampleInput = problem.SampleInput;
            problemViewModel.SampleOutput = problem.SampleOutput;
            problemViewModel.ConstraintNote = problem.ConstraintNote;
            problemViewModel.Description = problem.Description;
            problemViewModel.DifficultyId = problem.DifficultyId;


            problemViewModel.MaxScore = problem.MaxScore;
            problemViewModel.NoOfSubmission = problem.NoOfSubmission;
            problemViewModel.NoOfTestCaseFiles = problem.NoOfTestCaseFiles;
            problemViewModel.PostDateTime = problem.PostDateTime;

            return problemViewModel;
        }

        public Problem ToModel(ProblemViewModel problemViewModel)
        {
            Problem problem = new Problem();


            return problem;
        }


    }
}
