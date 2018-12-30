using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeFreak1.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CodeFreak1.HttpClients.CompilerNetworkApi;
using CodeFreak1.Models;
using CodeFreak1.Repositories;
using AutoMapper;

namespace CodeFreak1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompilerController : ControllerBase
    {

        ProblemTestCaseRepository problemTestCaseRepository = new ProblemTestCaseRepository();
        SubmissionRepository submissionRepository = new SubmissionRepository();
        UserRepository userRepository = new UserRepository();
        DBCodeFreakContext db = new DBCodeFreakContext();



        [Route("compile")]
        [HttpPost("compile")]
        [AllowAnonymous]
        public IActionResult compileCode(CodeViewModel code)
        {
            Users user = getApplicationUser();

            if (user == null)
            {
                RequestStatus requestStatus = new RequestStatus();
                requestStatus.Error = "User is not logined";
                requestStatus.StatusCode = 502;
                requestStatus.Success = false;
                return Ok(requestStatus);
            }

            SubmissionViewModel submission = new SubmissionViewModel();
            submission.Code = code.Code;
            submission.UserId = user.UserId;
            submission.ProblemId = code.ProblemId;
            submission.SubmissionId = Guid.NewGuid();
            submission.SubmissionDateTime = DateTime.Now;

            List<ProblemTestCase> problemTestCases = problemTestCaseRepository.GetProblemTestCasesByProblemId(code.ProblemId);

            CompilerInputViewModel input = new CompilerInputViewModel();
            input.SubmissionViewModel = submission;
            input.ProblemTestCaseViewModels = Mapper.Map<List<ProblemTestCase>, List<ProblemTestCaseViewModel>>(problemTestCases);

            var res = CompilerNetworkWebRequest.CompileCPlusPlusCode(input);
            if (res != null)
            {
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