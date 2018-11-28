using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeFreak1.Models;
using CodeFreak1.Repositories;
using CodeFreak1.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodeFreak1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubmissionController : ControllerBase
    {
        private SubmissionRepository submissionRepository = new SubmissionRepository();
        private ProblemRepository problemRepository = new ProblemRepository();
        private UserRepository userRepository = new UserRepository();

        [HttpPost]
        [AllowAnonymous]
        [Route("add")]

        public IActionResult addSubmission(SubmissionViewModel submission)
        {
            Submission sub = new Submission();

            sub.UserId = submission.UserId;
            sub.ProblemId = submission.ProblemId;
            sub.SubmissionId = submission.SubmissionId;
            sub.Score = submission.Score;
            sub.Status = submission.Status;
            sub.SubmissionDateTime = submission.SubmissionDateTime;

            submissionRepository.addSubmission(sub);

            RequestStatus result = new RequestStatus();
            result.Success = true;
            result.Error = "Problem Credentials Successfully Added";

            return Ok(result);

        }

        [HttpGet]
        [AllowAnonymous]
        [Route("uId")]

        public List<SubmissionViewModel> getByuID(Guid pid)
        {

            List<Submission> listSub = submissionRepository.getSubmissionOfUserId(pid);

            List<SubmissionViewModel> listSubmissionModel = new List<SubmissionViewModel>();

            foreach(Submission sub in listSub)
            {
                Users users = userRepository.getUserById(sub.UserId);
                UsersViewModel usermodel = new UsersViewModel();
                usermodel = new UsersConversion().ToViewModel(users);
                
     
                Problem problem = problemRepository.getProblemById(sub.ProblemId);
                ProblemViewModel problemViewModel = new ProblemViewModel();
                problemViewModel=new ProblemConversion().ToViewModel(problem);

                SubmissionViewModel subModel = new SubmissionViewModel();

                subModel.Problem = problemViewModel;
                subModel.User = usermodel;

                subModel.UserId = sub.UserId;
                subModel.ProblemId = sub.ProblemId;
                subModel.SubmissionId = sub.SubmissionId;
                subModel.Score = sub.Score;
                subModel.Status = sub.Status;
                subModel.SubmissionDateTime = sub.SubmissionDateTime;


                listSubmissionModel.Add(subModel);


            }


            return listSubmissionModel;



        }

        [HttpGet]
        [AllowAnonymous]
        [Route("pId")]


        public List<SubmissionViewModel> getBypId(Guid pid)
        {

            List<Submission> listSub = submissionRepository.getSubmissionOfProblemId(pid);

            List<SubmissionViewModel> listSubmissionModel = new List<SubmissionViewModel>();

            foreach (Submission sub in listSub)
            {
                Users users = userRepository.getUserById(sub.UserId);
                UsersViewModel usermodel = new UsersViewModel();
                usermodel = new UsersConversion().ToViewModel(users);


                Problem problem = problemRepository.getProblemById(sub.ProblemId);
                ProblemViewModel problemViewModel = new ProblemViewModel();
                problemViewModel = new ProblemConversion().ToViewModel(problem);

                SubmissionViewModel subModel = new SubmissionViewModel();

                subModel.Problem = problemViewModel;
                subModel.User = usermodel;

                subModel.UserId = sub.UserId;
                subModel.ProblemId = sub.ProblemId;
                subModel.SubmissionId = sub.SubmissionId;
                subModel.Score = sub.Score;
                subModel.Status = sub.Status;
                subModel.SubmissionDateTime = sub.SubmissionDateTime;


                listSubmissionModel.Add(subModel);


            }


            return listSubmissionModel;


        }

        [HttpGet]
        [AllowAnonymous]
        [Route("Ids")]
        public List<SubmissionViewModel> getByIds(Guid pid, Guid uid)
        {

            List<Submission> listSub = submissionRepository.getSubmissionOfUserIdProblemId(uid, pid);

            List<SubmissionViewModel> listSubmissionModel = new List<SubmissionViewModel>();

            foreach (Submission sub in listSub)
            {
                Users users = userRepository.getUserById(sub.UserId);
                UsersViewModel usermodel = new UsersViewModel();
                usermodel = new UsersConversion().ToViewModel(users);


                Problem problem = problemRepository.getProblemById(sub.ProblemId);
                ProblemViewModel problemViewModel = new ProblemViewModel();
                problemViewModel = new ProblemConversion().ToViewModel(problem);

                SubmissionViewModel subModel = new SubmissionViewModel();

                subModel.Problem = problemViewModel;
                subModel.User = usermodel;

                subModel.UserId = sub.UserId;
                subModel.ProblemId = sub.ProblemId;
                subModel.SubmissionId = sub.SubmissionId;
                subModel.Score = sub.Score;
                subModel.Status = sub.Status;
                subModel.SubmissionDateTime = sub.SubmissionDateTime;


                listSubmissionModel.Add(subModel);


            }


            return listSubmissionModel;

        }



    }
}



        