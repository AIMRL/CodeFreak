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
        public ActionResult Compile(CodeViewModel obj)
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

            // getting the base url of the current direcotry in which file resides
            string baseUrl = Directory.GetCurrentDirectory();

            // -COMPILER ENGINE WORKING-
            try
            {
                // Specify the directory you want to manipulate.
                string studentDirectoryPath = Path.Combine(baseUrl, @"User\" + obj.StudentID);
                try
                {
                    // Determine whether the directory exists.
                    if (Directory.Exists(studentDirectoryPath) == false)
                    {
                        // Try to create the directory.
                        DirectoryInfo di = Directory.CreateDirectory(studentDirectoryPath);
                        Debug.WriteLine("The directory was created successfully at {0}.", Directory.GetCreationTime(studentDirectoryPath));
                    }
                }
                catch (Exception e)
                {
                    Debug.WriteLine("The process failed: {0}", e.ToString());
                }
            
                // writing the received code from the user in a code.cpp file in his directory 
                string codePath = Path.Combine(baseUrl, @"User\" + obj.StudentID + @"\Code.cpp");
                try
                {
                    StreamWriter sw = new StreamWriter(codePath);
                    sw.Write(obj.Code);
                    sw.Close();
                }
                catch (Exception e)
                {
                    Debug.WriteLine("Exception: " + e.Message);
                }

                // open the file inputs.txt for the test cases
                string problemInputsPath = Path.Combine(baseUrl, @"Problem\" + obj.ProblemID + @"\inputs.txt");
                StreamReader TestCaseSR = new StreamReader(problemInputsPath);

                // open the file outputs.txt for the true output of the test cases
                string problemOutputsPath = Path.Combine(baseUrl, @"Problem\" + obj.ProblemID + @"\outputs.txt");
                StreamReader TrueOutSR = new StreamReader(problemOutputsPath);

                // read the first test case and put testCase count ++
                testCase = TestCaseSR.ReadLine();
                testCaseCount++;

                // read the first true output for the first test case
                trueOut = TrueOutSR.ReadLine();

                // write the batch file of the specific user in his directory
                string batchPath = Path.Combine(baseUrl, @"User\" + obj.StudentID + @"\Batch.bat");
                try
                {
                    StreamWriter sw = new StreamWriter(batchPath);
                    sw.WriteLine("cd " + baseUrl + @"\User\" + obj.StudentID);
                    sw.WriteLine("g++ Code.cpp -o Code.exe");
                    sw.WriteLine("Code.exe");
                    sw.Close();
                }
                catch (Exception e)
                {
                    Debug.WriteLine("Exception: " + e.Message);
                }

                // looping the file to the end
                string uniqueName = obj.StudentID + "_" + obj.ProblemID + "_submission_" + Guid.NewGuid().ToString() + ".txt";
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

                    // writing to the stream (giving inputs
                    myStreamWriter.WriteLine(testCase);

                    // reading from the stream (taking output)
                    string output = myStreamreader.ReadToEnd();

                    // closing the process
                    myProcess.WaitForExit();
                    myProcess.Close();

                    // writing the the taken output in a file userout.txt in specific user directory
                    string userOutPath = Path.Combine(baseUrl, @"User\" + obj.StudentID + @"\userout.txt");
                    try
                    {
                        StreamWriter sw = new StreamWriter(userOutPath);
                        sw.WriteLine(output);
                        sw.Close();
                    }
                    catch (Exception e)
                    {
                        Debug.WriteLine("Exception: " + e.Message);
                    }

                    // comparison of the file userout.txt with the true output of the test cases
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
                        Debug.WriteLine("Exception: " + e.Message);
                    }

                    // writing the result of the test case in result.txt for a specific user in his directory
                    string resultPath = Path.Combine(baseUrl, @"User\" + obj.StudentID + @"\" + uniqueName);
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
                            Debug.WriteLine("Exception: " + e.Message);
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
                            Debug.WriteLine("Exception: " + e.Message);
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
                    StreamReader sr = new StreamReader(Path.Combine(baseUrl, @"User\" + obj.StudentID + @"\" + uniqueName));
                    result.Result = sr.ReadToEnd();
                    sr.Close();
                }
                catch (Exception e)
                {
                    Debug.WriteLine("Exception: " + e.Message);
                }

            }
            catch (Exception e)
            {
                Debug.WriteLine("Exception: " + e.Message);
            }
            finally
            {
                // closing the reader and writer streams
                myStreamWriter.Close();
                myStreamreader.Close();
            }
            return Ok(result);
        }
    }
}