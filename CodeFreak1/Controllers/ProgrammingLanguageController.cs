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
    public class ProgrammingLanguageController : Controller
    {
        LanguageRepository rep = new LanguageRepository();
        [HttpGet("allLanguage")]
        public IActionResult GetAllLanguages()
        {
            List<ProgrammingLanguage> languages = rep.GetProgrammingLanguages();

            return Ok(Mapper.Map<List<ProgrammingLanguage>, List<ProgrammingLanguageViewModel>>(languages));
        }

    }
}