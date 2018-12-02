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
    public class ProblemTypeController : Controller
    {
        ProblemTypeRepository rep = new ProblemTypeRepository();
        [HttpGet("allProblemTypes")]
        public IActionResult GetAllProblemTypes()
        {
            List<ProblemType> problemTypes = rep.GetProblemTypes();

            return Ok(Mapper.Map<List<ProblemType>, List<ProblemTypeViewModel>>(problemTypes));
        }
    }
}