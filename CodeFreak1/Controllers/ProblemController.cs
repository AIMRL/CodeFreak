using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeFreak1.Models;
using CodeFreak1.Repositories;
using CodeFreak1.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CodeFreak1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ProblemController : ControllerBase
    {
        private ProblemRepository problemRepository = new ProblemRepository();

        [HttpPost]
        [AllowAnonymous]
        [Route("add")]

        public IActionResult addProblem(ProblemViewModel problemViewModel)
        {

            Problem problem = new Problem();


            problem.ProblemTypeId = problemViewModel.ProblemTypeId;
            problem.AuthorId = problemViewModel.AuthorId;
            problem.InputFormat = problemViewModel.InputFormat;
            problem.OutputFormat = problemViewModel.OutputFormat;
            problem.SampleInput = problemViewModel.SampleInput;
            problem.SampleOutput = problemViewModel.SampleOutput;
            problem.ConstraintNote = problemViewModel.ConstraintNote;
            problem.Description = problemViewModel.Description;
            problem.DifficultyId = problemViewModel.DifficultyId;


            problem.MaxScore = problemViewModel.MaxScore;
            problem.NoOfSubmission = problemViewModel.NoOfSubmission;
            problem.NoOfTestCaseFiles = problemViewModel.NoOfTestCaseFiles;
            problem.PostDateTime = problemViewModel.PostDateTime;


            problemRepository.addProblem(problem);

            RequestStatus result = new RequestStatus();
            result.Success = true;
            result.Error = "Problem Credentials Successfully Added";

            return Ok(result);
        }


    }
}
