using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeFreak1.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodeFreak1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompilerController : ControllerBase
    {
        [Route("compile")]
        [HttpPost("compile")]
        [AllowAnonymous]
        public IActionResult compileCode(CodeViewModel code)
        {
            CompilerResultViewModel res = new CompilerResultViewModel();
            res.Result = "Compiler Api is not called yet";
            res.Success = true;
            res.StatusCode = 200;

            return Ok(res);
        }
    }
}