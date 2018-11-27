using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeFreak1.Models;
using CodeFreak1.Repositories;
using CodeFreak1.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CodeFreak1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ProblemController : ControllerBase
    {
        private ProblemRepository problemRepository = new ProblemRepository();


        // GET: api/<controller>
        [HttpGet]
        [AllowAnonymous]

        public IEnumerable<string> Get()
        {
            return new string[] { "problem", "controller" };
        }


        [HttpPost]
        [AllowAnonymous]
        [Route("add")]

        public IActionResult addProblem(Problem problem)
        {
            //RequestStatus result = new RequestStatus();
            //result.Success = false;
            //result.Error = "Invalid Problem Credentials";

            problemRepository.InsertProblem(problem);

            RequestStatus result = new RequestStatus();
            result.Success = true;
            result.Error = "Problem Credentials Successfully Added";




            return Ok(result);
        }

  

        // POST api/<controller>
        [HttpPost]
        [AllowAnonymous]
        [Route("check")]
        public Problem Post([FromBody]string value)
        {
            Guid obj = Guid.NewGuid();

            Problem pro=problemRepository.getProblemById(obj);

            return pro;

            //if (value == "arslan")
            //    return "baoo";

            //return "dude";

        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
