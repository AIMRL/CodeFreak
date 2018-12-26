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
            CompilerInputViewModel input = new CompilerInputViewModel();
            input.SubmissionViewModel.Code = code.Code;
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
    }
}