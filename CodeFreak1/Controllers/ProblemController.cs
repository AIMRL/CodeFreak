using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AutoMapper;
using CodeFreak1.Models;
using CodeFreak1.Repositories;
using CodeFreak1.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CodeFreak1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProblemController : ControllerBase
    {
        ProblemRepository rep = new ProblemRepository();
        EditorialRepository editRep = new EditorialRepository();
        ProblemTestCaseRepository probTestCaseRep = new ProblemTestCaseRepository();
        UserRepository userRepository = new UserRepository();

        private IHostingEnvironment _hostingEnvironment;
        public ProblemController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        [Route("addProblem")]
        [HttpPost("addProblem")]
        [AllowAnonymous]
        public IActionResult addProblem()
        {
            try
            {
                //getting data from request
                ProblemViewModel problemViewModel = JsonConvert.DeserializeObject<ProblemViewModel>(Request.Form["problem"]);
                EditorialViewModel editorialViewModel = JsonConvert.DeserializeObject<EditorialViewModel>(Request.Form["editorial"]);
                RequestStatus requestStatus = new RequestStatus();
                //Checking any fault in data
                if (problemViewModel == null)
                {
                    requestStatus.makeObjectNull();
                    return Ok(requestStatus);
                }
                if (rep.getProblemByName(problemViewModel.Title) != null)
                {
                    requestStatus.makeNameAlreadyEist();
                    return Ok(requestStatus);
                }
                //adding problem in database
                Problem problem = Mapper.Map<ProblemViewModel, Problem>(problemViewModel);
                Users user = getApplicationUser();
                problem.AuthorId = user.UserId;
                problem.NoOfSubmission = 0;
                problem.PostDateTime = DateTime.Now;
                problem.ProblemId = Guid.NewGuid();
                Problem insertedProblem = rep.InsertProblem(problem);
                if (insertedProblem == null)
                {
                    requestStatus.makeFailed("problem does not added");
                    return Ok(requestStatus);
                }
                //Adding editorial in database
                Editorial insertedEditorial = null;
                if (editorialViewModel != null && !String.IsNullOrEmpty(editorialViewModel.Code))
                {
                    Editorial editorial = Mapper.Map<EditorialViewModel, Editorial>(editorialViewModel);
                    editorial.EditorialId = Guid.NewGuid();
                    editorial.ProblemId = insertedProblem.ProblemId;
                    editorial.UserId = user.UserId;
                    insertedEditorial = editRep.insertEditorial(editorial);
                }
                try
                {
                    //Adding files
                    var files = Request.Form.Files;
                    string folderName = Path.Combine("CompilerNetwork", "Problem");
                    string path = Directory.GetCurrentDirectory();
                    String path1 = new String(path.Reverse().ToArray());
                    path1 = path1.Substring(path1.IndexOf('\\') + 1, path1.Length - (path1.IndexOf('\\') + 1));
                    path1 = new String(path1.Reverse().ToArray());
                    string newPath = Path.Combine(path1, folderName);

                    if (!Directory.Exists(newPath))
                    {
                        Directory.CreateDirectory(newPath);
                    }
                    List<ProblemTestCase> problemTestFiles = new List<ProblemTestCase>();
                    string problemPath = Path.Combine(newPath, insertedProblem.ProblemId.ToString());
                    if (!Directory.Exists(problemPath))
                    {
                        Directory.CreateDirectory(problemPath);
                    }

                    for (int i = 1; i < files.Count; i=i+2)
                    {
                        
                        ProblemTestCase problemTestCase = new ProblemTestCase();
                        string inputFileName = files[i - 1].Name.Replace('.','a')+ Guid.NewGuid().ToString()+".txt";                        //ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        string inputFilePath = Path.Combine(problemPath, inputFileName);
                        using (var stream = new FileStream(inputFilePath, FileMode.Create))
                        {
                            files[i-1].CopyTo(stream);
                        }
                        string outputFileName = files[i].Name.Replace('.', 'a')+ Guid.NewGuid().ToString()+".txt";
                        string outputFilePath = Path.Combine(problemPath, outputFileName);
                        using (var stream = new FileStream(outputFilePath, FileMode.Create))
                        {
                            files[i].CopyTo(stream);
                        }

                        problemTestCase.InputFilePath = inputFileName;
                        problemTestCase.ProblemId=insertedProblem.ProblemId;
                        problemTestCase.ProblemTestCaseId = Guid.NewGuid();
                        problemTestCase.SizeInputFile = Convert.ToInt32(files[i-1].Length);
                        problemTestCase.OutputFilePath = outputFileName;
                        problemTestCase.SizeOutputFile=Convert.ToInt32(files[i].Length);
                        probTestCaseRep.addProblemTestCase(problemTestCase);

                    }

                    ProblemViewModel insertedProblemViewModel = Mapper.Map<Problem, ProblemViewModel>(insertedProblem);
                    insertedProblemViewModel.makeSuccess();
                    return Ok(insertedProblemViewModel);

                }
                catch (Exception ex)
                {
                    ProblemViewModel insertedProblemViewModel = Mapper.Map<Problem, ProblemViewModel>(insertedProblem);
                    insertedProblemViewModel.makeSuccess();
                    return Ok(insertedProblemViewModel);
                }
            }
            catch (System.Exception ex)
            {
                RequestStatus requestStatus = new RequestStatus();
                requestStatus.makeFailed(ex.Message);
                return Ok(requestStatus);
            }
        }


        [Route("allProblem")]
        [HttpGet("allProblem")]
        public IActionResult GetAllProblems()
        {
            var list = rep.getAllProblems();
            List<ProblemCompleteViewModel> problems = new List<ProblemCompleteViewModel>();
            foreach (var item in list)
            {
                ProblemCompleteViewModel problemListViewModel = new ProblemCompleteViewModel();
                problemListViewModel.Problem = Mapper.Map<Problem, ProblemViewModel>(item);
                problemListViewModel.Difficulty = Mapper.Map<Difficulty, DifficultyViewModel>(item.Difficulty);
                problemListViewModel.ProblemType = Mapper.Map<ProblemType, ProblemTypeViewModel>(item.ProblemType);
                problems.Add(problemListViewModel);
            }


            return Ok(problems);
        }
        [Route("problemById")]
        [HttpGet("problemById")]
        public IActionResult GetProblemBId(Guid id)
        {
            Problem problem = rep.getProblemById(id);
            if (problem == null)
            {
                RequestStatus requestStatus = new RequestStatus();
                requestStatus.Error = "Problem Does not exist";
                requestStatus.Success = false;
                requestStatus.StatusCode = 404;

                return Ok(requestStatus);

            }
            ProblemCompleteViewModel problemComplete = new ProblemCompleteViewModel();
            problemComplete.Problem = Mapper.Map<Problem, ProblemViewModel>(problem);
            problemComplete.Difficulty = Mapper.Map<Difficulty, DifficultyViewModel>(problem.Difficulty);
            problemComplete.ProblemType = Mapper.Map<ProblemType, ProblemTypeViewModel>(problem.ProblemType);
            problemComplete.makeSuccess();
            return Ok(problemComplete);
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