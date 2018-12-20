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
            // declare test case count
            int testCaseCount = 0;

            // declare the process class instance
            Process myProcess;

            // declaring the testCase and trueOut
            string testCase, trueOut;

            // declaration of the reader and writer stream
            StreamWriter myStreamWriter = null;
            StreamReader myStreamreader = null;

            // creating instance of a result view model to send the result back to user
            CompilerResultViewModel result = null;
            
            // -COMPILER ENGINE WORKING-
            try
            {
                // getting the base url of the current direcotry in which file resides
                string baseUrl = Directory.GetCurrentDirectory();

                // writing the received code from the user in a code.cpp file
                string codePath = Path.Combine(baseUrl, "Code.cpp");
                try
                {
                    StreamWriter sw = new StreamWriter(codePath);
                    sw.Write(code);
                    sw.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine("Exception: " + e.Message);
                }

                // open the file test.txt
                string testPath = Path.Combine(baseUrl, "test.txt");
                StreamReader TestCaseSR = new StreamReader(testPath);

                // open the file trueout.txt
                string tureOutPath = Path.Combine(baseUrl, "trueout.txt");
                StreamReader TrueOutSR = new StreamReader(tureOutPath);

                // read the first test case and put testCase count ++
                testCase = TestCaseSR.ReadLine();
                testCaseCount++;

                // read the first true output
                trueOut = TrueOutSR.ReadLine();

                // looping the file to the end
                string batchPath = Path.Combine(baseUrl, "Batch.bat");
                while (testCase != null)
                {
                    // starting a process
                    myProcess = new Process();
                    myProcess.StartInfo.FileName = batchPath;
                    myProcess.StartInfo.UseShellExecute = false;
                    myProcess.StartInfo.RedirectStandardInput = true;
                    myProcess.StartInfo.RedirectStandardOutput = true;
                    myProcess.Start();

                    // binding the input and output streams
                    myStreamWriter = myProcess.StandardInput;
                    myStreamreader = myProcess.StandardOutput;

                    // writing to the stream (giving inputs)
                    myStreamWriter.WriteLine(testCase);

                    // reading from the stream (taking output)
                    string output = myStreamreader.ReadToEnd();

                    // closing the process
                    myProcess.WaitForExit();
                    myProcess.Close();

                    // writing the the taken output in a file userout.txt
                    string userOutPath = Path.Combine(baseUrl, "userout.txt");
                    try
                    {
                        StreamWriter sw = new StreamWriter(userOutPath);
                        sw.WriteLine(output);
                        sw.Close();
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine("Exception: " + e.Message);
                    }

                    // comparison of the file userout.txt & trueout.txt
                    string userOut;
                    bool match = false;
                    try
                    {
                        StreamReader UserOutSR = new StreamReader(userOutPath);

                        userOut = UserOutSR.ReadLine();
                        while (userOut != null && match == false)
                        {
                            if (string.Equals(userOut, trueOut))
                            {
                                match = true;
                            }
                            userOut = UserOutSR.ReadLine();
                        }
                        UserOutSR.Close();
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine("Exception: " + e.Message);
                    }

                    // writing the result of the test case in result.txt
                    string resultPath = Path.Combine(baseUrl, "result.txt");
                    if (match)
                    {
                        try
                        {
                            StreamWriter sw = System.IO.File.AppendText(resultPath);
                            sw.WriteLine("Result For Test Case No: " + testCaseCount.ToString());
                            sw.WriteLine("Test Case Comparison Successful.");
                            sw.WriteLine("No Difference Encountered.");
                            sw.WriteLine();
                            sw.Close();
                        }
                        catch (Exception e)
                        {
                            Console.WriteLine("Exception: " + e.Message);
                        }
                    }
                    else
                    {
                        try
                        {
                            StreamWriter sw = System.IO.File.AppendText(resultPath);
                            sw.WriteLine("Result For Test Case No: " + testCaseCount.ToString());
                            sw.WriteLine("Test Case Comparison Failed.");
                            sw.WriteLine("Difference Encountered.");
                            sw.WriteLine();
                            sw.Close();
                        }
                        catch (Exception e)
                        {
                            Console.WriteLine("Exception: " + e.Message);
                        }
                    }

                    // making the match false so that for next test case it will be clear.
                    match = false;

                    // reading the next text case and also increasing the count
                    testCase = TestCaseSR.ReadLine();
                    testCaseCount++;

                    // reading the next true output
                    trueOut = TrueOutSR.ReadLine();
                }
                // closing the TrueOutSR stream
                TrueOutSR.Close();

                // closing the TestCaseSR stream
                TestCaseSR.Close();

                // initializing and assigning the result property of result view model
                result = new CompilerResultViewModel();
                result.Result = "";

                // reading the result.txt file and generating responce to send back to user
                try
                {
                    StreamReader sr = new StreamReader(Path.Combine(baseUrl, "result.txt"));
                    result.Result = sr.ReadToEnd();
                    sr.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine("Exception: " + e.Message);
                }

            }
            catch (Exception e)
            {
                Console.WriteLine("Exception: " + e.Message);
            }
            finally
            {
                // closing the reader and writer streams
                myStreamWriter.Close();
                myStreamreader.Close();
            }
            return Ok(result);
        }
        private void writeCodeInFile(string path, string code)
        {
            
        }
    }
}