using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeFreak1.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CodeFreak1.HttpClients.CompilerNetworkApi;
using CodeFreak1.Repositories;
using AutoMapper;
using CodeFreak1.Models;
using System.IO;
using System.Diagnostics;

namespace CodeFreak1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompilerController : ControllerBase
    {
        SubmissionRepository subRepos = new SubmissionRepository();
        ProblemTestCaseRepository testRepos = new ProblemTestCaseRepository();
        SubmissionProblemTestCaseRepository subProbTestRepo = new SubmissionProblemTestCaseRepository();
        ProblemRepository probReops = new ProblemRepository();
        UserRepository userRepository = new UserRepository();

        [HttpGet]
        [Route("byUrlFile")]
        [AllowAnonymous]

        public IActionResult getCode(String urlFile)
        {
            Users user = this.getApplicationUser();

            string folderName = Path.Combine("CompilerNetwork", "User");
            string path = Directory.GetCurrentDirectory();
            string path1 = new String(path.Reverse().ToArray());
            path1 = path1.Substring(path1.IndexOf('\\') + 1, path1.Length - (path1.IndexOf('\\') + 1));
            path1 = new String(path1.Reverse().ToArray());
            string newPath = Path.Combine(path1, folderName);

            string userOutputPath = Path.Combine(newPath + @"\" + user.UserId.ToString() + @"\" + urlFile);
            string content = "";

            try
            {
                StreamReader UserOutSR = new StreamReader(userOutputPath);
                content = UserOutSR.ReadToEnd();
                UserOutSR.Close();
            }
            catch (Exception e)
            {
                Debug.WriteLine("Exception: " + e.Message);
            }

            return Ok(content);
        }

        [Route("compile")]
        [HttpPost("compile")]
        [AllowAnonymous]
        public IActionResult compileCode(ProblemUserCodeViewModel code)
        {
            
            CompilerInputViewModel input = new CompilerInputViewModel();

            Users user = getApplicationUser();

            if (user == null)
            {
                RequestStatus requestStatus = new RequestStatus();
                requestStatus.Error = "User is not logined";
                requestStatus.StatusCode = 502;
                requestStatus.Success = false;
                return Ok(requestStatus);
            }
            //hardcoded for now ;
            code.userId = user.UserId.ToString();
            
            SubmissionViewModel submission = new SubmissionViewModel();

            submission.SubmissionId = Guid.NewGuid().ToString();
            submission.UserId = code.userId;
            submission.ProblemId = code.problemId;
            submission.Score = 0;
            submission.Status = "";
            submission.SubmissionDateTime = DateTime.Now;
            submission.Code = code.Code;
            submission.LanguageId = 1;



            List<ProblemTestCaseViewModel> myTests = new List<ProblemTestCaseViewModel>();
            var testCaseList = testRepos.getProblemTestCaseByProblemId(Guid.Parse(code.problemId));


            foreach (var item in testCaseList)
            {
                ProblemTestCaseViewModel problemTestCaseviewModel = new ProblemTestCaseViewModel();
                problemTestCaseviewModel = Mapper.Map<ProblemTestCase, ProblemTestCaseViewModel>(item);
                myTests.Add(problemTestCaseviewModel);
            }


            input.ProblemTestCaseViewModels = myTests;
            input.SubmissionViewModel=submission;
        
            var res = CompilerNetworkWebRequest.CompileCPlusPlusCode(input);
            Boolean flag = false;

            if (res != null)
            {
                
                foreach (var item in res.TestcasesResult)
                {
                    if (item.Status.Contains("SuccessTestCaseCount: 0"))
                    {
                        submission.Status = "failed";
                        submission.Score = 0;
                        flag = true;
                        break;

                    }

                }
                Problem prob = probReops.getProblemById(Guid.Parse(code.problemId));
                int maxScore = prob.MaxScore;
                if (flag == false)
                {
                    submission.Status = "passed";
                    submission.Score = maxScore;
                }
                subRepos.addSubmission(Mapper.Map<SubmissionViewModel, Submission>(submission));
                foreach (var item in res.TestcasesResult)
                {
                    subProbTestRepo.addSubmissionProblemTestCase(Mapper.Map<SubmissionProblemTestCaseViewModel, SubmissionProblemTestCase>(item));
                }
                
                res.Success = true;
                res.StatusCode = 200;

            }
            else
            {
                res = new CompilerOutputViewModel();
                res.Error = "Api does not working";
                res.Success = true;
                res.StatusCode = 200;
            }
            return Ok(res);
        }
        public Users getApplicationUser()
        {
            var identity = User.Identities.FirstOrDefault(s => s.Name.ToLower() == "user");
            var claims = identity.Claims;
            string id = null;
            foreach (var c in claims)
            {
                if (c.Type == "userId")
                {
                    id = c.Value;
                }
            }
            Users user = null;
            if (id != null)
            {
                user = userRepository.getUserById(new Guid(id));
            }
            return user;
        }

    }
}