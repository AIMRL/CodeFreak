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

        [HttpGet]
        [Route("byUserId")]
        [AllowAnonymous]

        public IActionResult getSubmissionByUserId(Guid UserId)
        {
            Guid uu = new Guid("0E984725-C51C-4BF4-9960-E1C80E27ABA0");

            List<Submission> subList=rep.getSubmissionOfUserId(uu);

            return Ok(Mapper.Map<List<Submission>, List<SubmissionViewModel>>(subList));
        }

    }
}
 