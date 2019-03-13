using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CodeFreak1.Models;
using CodeFreak1.Repositories;
using CodeFreak1.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CodeFreak1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class ProblemController : ControllerBase
    {
        ProblemRepository rep = new ProblemRepository();


        [Route("allProblem")]
        [HttpGet("allProblem")]
        public IActionResult GetAllProblems()
        {
            var list = rep.getAllProblems();
            List<ProblemCompleteViewModel> problems = new List<ProblemCompleteViewModel>();
            foreach (var item in list)
            {
                ProblemCompleteViewModel problemListViewModel = new ProblemCompleteViewModel();
                problemListViewModel.Problem = Mapper.Map<Problem, ProblemViewModel>(item);
                problemListViewModel.Difficulty = Mapper.Map<Difficulty, DifficultyViewModel>(item.Difficulty);
                problemListViewModel.ProblemType = Mapper.Map<ProblemType, ProblemTypeViewModel>(item.ProblemType);
                problems.Add(problemListViewModel);
            }


            return Ok(problems);
        }
        [Route("problemById")]
        [HttpGet("problemById")]
        public IActionResult GetProblemBId(Guid id)
        {
            Problem problem = rep.getProblemById(id);
            if (problem == null)
            {
                RequestStatus requestStatus = new RequestStatus();
                requestStatus.Error = "Problem Does not exist";
                requestStatus.Success = false;
                requestStatus.StatusCode = 404;

                return Ok(requestStatus);

            }
            ProblemCompleteViewModel problemComplete = new ProblemCompleteViewModel();
            problemComplete.Problem = Mapper.Map<Problem, ProblemViewModel>(problem);
            problemComplete.Difficulty = Mapper.Map<Difficulty, DifficultyViewModel>(problem.Difficulty);
            problemComplete.ProblemType = Mapper.Map<ProblemType, ProblemTypeViewModel>(problem.ProblemType);
            problemComplete.makeSuccess();
            return Ok(problemComplete);
        }
    }
}