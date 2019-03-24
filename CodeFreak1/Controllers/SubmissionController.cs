using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeFreak1.Models;
using CodeFreak1.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using CodeFreak1.ViewModel;
using AutoMapper;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CodeFreak1.Controllers
{
    [Route("api/[controller]")]
    public class SubmissionController : Controller
    {
        SubmissionRepository rep = new SubmissionRepository();
        LanguageRepository languageRep = new LanguageRepository();
        UserRepository userRepository = new UserRepository();
        SubmissionProblemTestCaseRepository submissionProblemTestCaseRepository = new SubmissionProblemTestCaseRepository();

        [HttpGet]
        [Route("byUserId")]
        [AllowAnonymous]

        public IActionResult getSubmissionByUserId(Guid UserId)
        {
            Guid uu = new Guid("0E984725-C51C-4BF4-9960-E1C80E27ABA0");

            List<Submission> subList=rep.getSubmissionOfUserId(uu);

            return Ok(Mapper.Map<List<Submission>, List<SubmissionViewModel>>(subList));
        }

        [HttpGet]
        [Route("byUser")]
        [AllowAnonymous]

        public IActionResult getUserSubmission(Guid UserId)
        {
            return Ok(rep.getSubmission(UserId));
        }


        [HttpGet]
        [Route("byProblemId")]
        [AllowAnonymous]

        public IActionResult getSubmissionByProblemId(Guid ProblemId)
        {
           
            Users user = getApplicationUser();

            List<Submission> subList = rep.getSubmissionOfUserIdProblemId(user.UserId, ProblemId);

            return Ok(Mapper.Map<List<Submission>, List<SubmissionViewModel>>(subList));
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

        [HttpGet]
        [Route("bySubId")]
        [AllowAnonymous]

        public IActionResult getSubmissionDetail(Guid sId)
        {


            Submission sub = rep.getSubmissionDetail(sId);
            sub.SubmissionProblemTestCase = submissionProblemTestCaseRepository.getSubmissionProblemTestCase(sId);
            return Ok(Mapper.Map<Submission, SubmissionViewModel>(sub));
        }

        [HttpGet]
        [Route("Test")]
        [AllowAnonymous]

        public IActionResult test()
        {

            ///  System.Web.HttpContext;

            int wow = 1;


            return Ok();

        }
    }
}
 