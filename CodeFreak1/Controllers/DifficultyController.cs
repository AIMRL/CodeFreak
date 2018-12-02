using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CodeFreak1.Models;
using CodeFreak1.Repositories;
using AutoMapper;
using CodeFreak1.ViewModel;
using Microsoft.AspNetCore.Authorization;

namespace CodeFreak1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class DifficultyController : Controller
    {
        DifficultyRepository rep = new DifficultyRepository();
        [HttpGet("allDifficulty")]
        public IActionResult GetAllDifficulty()
        {
            List<Difficulty> difficulties = rep.GetDifficulties();

            return Ok(Mapper.Map<List<Difficulty>,List<DifficultyViewModel>>(difficulties));
        }
    }
}