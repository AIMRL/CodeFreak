using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeFreak1.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CodeFreak1.HttpClients.CompilerNetworkApi;
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
            var res = CompilerNetworkWebRequest.CompileCPlusPlusCode(code);
            if (res != null)
            {
                res.Success = true;
                res.StatusCode = 200;
            }
            else
            {
                res = new CompilerResultViewModel();
                res.Result = "Api does not working";
                res.Success = true;
                res.StatusCode = 200;
            }
            return Ok(res);
        }
    }
}