using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CompileNetwork.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CompileNetwork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompilerEngineController : ControllerBase
    {
        [HttpGet]
        public ActionResult GetAll()
        {
            return Ok("Confirmed.");
        }


        [HttpPost("Compile")]
        public ActionResult Compile(CodeViewModel code)
        {
            String Code = @"

             //Code Written

             #include<iostream>
             using namespace std;
            int main ()
            {
                int a,b;

                cin>>a;
                cin>>b;

                cout<<a-b;

                return 1;
            }
            
            
            ";
            CompilerResultViewModel result = null;
            string baseUrl = Directory.GetCurrentDirectory();
            string path = Path.Combine(baseUrl,"Code.cpp");
            try
            {
                writeCodeInFile(path, code.Code);
                Process myProcess = new Process();
                myProcess.StartInfo.UseShellExecute = false;
                // You can start any process, HelloWorld is a do-nothing example.
                myProcess.StartInfo.FileName =Path.Combine(baseUrl, "Batch.bat");
                myProcess.StartInfo.CreateNoWindow = true;
                myProcess.Start();
                myProcess.WaitForExit();

                result = new CompilerResultViewModel();
                result.Result = "";
                string testUrl = Path.Combine(baseUrl, "result.txt");
                using (StreamReader file = new StreamReader(testUrl))
                {
                    result.Result = file.ReadToEnd();
                }
            }
            catch { }
            return Ok(result);
        }
        private void writeCodeInFile(string path, string code)
        {
            try
            {
                using (StreamWriter writer = new StreamWriter(path))
                {
                    writer.Write(code);
                }
            }
            catch
            {

            }
        }
    }
}