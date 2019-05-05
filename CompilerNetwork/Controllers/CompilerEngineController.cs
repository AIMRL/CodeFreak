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
        public ActionResult Compile(CompilerInputViewModel obj)
        {
            // declare the process class instance
            Process myProcess;

            // declaring the testCase and trueOut
            string testCase, trueOut;

            // declaration of the reader and writer stream
            StreamWriter myStreamWriter = null;
            StreamReader myStreamreader = null;

            // declaration of the result view model
            CompilerOutputViewModel Result = new CompilerOutputViewModel();
            Result.TestcasesResult = new List<SubmissionProblemTestCaseViewModel>();

            // getting the base url of the current direcotry in which file resides
            string baseUrl = Directory.GetCurrentDirectory();

            // Specify the directory you want to manipulate.
            string studentDirectoryPath = Path.Combine(baseUrl, @"User\" + obj.SubmissionViewModel.UserId.ToString());
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
            string codePath = Path.Combine(baseUrl, @"User\" + obj.SubmissionViewModel.UserId.ToString() + @"\Code.cpp");
            try
            {
                StreamWriter sw = new StreamWriter(codePath);
                sw.Write(obj.SubmissionViewModel.Code);
                sw.Close();
            }
            catch (Exception e)
            {
                Debug.WriteLine("Exception: " + e.Message);
            }

            // write the batch file of the specific user in his directory
            string batchPath = Path.Combine(baseUrl, @"User\" + obj.SubmissionViewModel.UserId.ToString() + @"\Batch.bat");
            try
            {
                StreamWriter sw = new StreamWriter(batchPath);
                sw.WriteLine("cd " + baseUrl + @"\User\" + obj.SubmissionViewModel.UserId.ToString());
                sw.WriteLine("g++ Code.cpp -o Code.exe");
                sw.WriteLine("Code.exe");
                sw.Close();
            }
            catch (Exception e)
            {
                Debug.WriteLine("Exception: " + e.Message);
            }

            // loop to iterate through each test case files
            foreach (ProblemTestCaseViewModel TestCaseFile in obj.ProblemTestCaseViewModels)
            {
                // -COMPILER ENGINE WORKING-
                try
                {
                    // declare test case count
                    int testCaseCount = 0;

                    // declaration and assinging of the properties of the result-single view model
                    SubmissionProblemTestCaseViewModel ResultTestCaseFile = new SubmissionProblemTestCaseViewModel();
                    ResultTestCaseFile.SubmissionProblemTestCaseId = Guid.NewGuid().ToString();
                    ResultTestCaseFile.SubmissionId = obj.SubmissionViewModel.SubmissionId;
                    ResultTestCaseFile.ProblemTestCaseId = TestCaseFile.ProblemTestCaseId.ToString();

                    // open the file inputs.txt for the test cases
                    string problemInputsPath = Path.Combine(baseUrl, @"Problem\" + TestCaseFile.ProblemId.ToString() + @"\" + TestCaseFile.InputFilePath);
                    StreamReader TestCaseSR = new StreamReader(problemInputsPath);

                    // open the file outputs.txt for the true output of the test cases
                    string problemOutputsPath = Path.Combine(baseUrl, @"Problem\" + TestCaseFile.ProblemId.ToString() + @"\" + TestCaseFile.OutputFilePath);
                    StreamReader TrueOutSR = new StreamReader(problemOutputsPath);

                    // read the first test case and put testCase count ++
                    testCase = TestCaseSR.ReadLine();
                    testCaseCount++;

                    // read the first true output for the first test case
                    trueOut = TrueOutSR.ReadLine(); 

                    // looping the file to the end with particular test case declaration and file naming convention
                    string userOutputPath = null;
                    int successTestCaseCount = 0, failTestCaseCount = 0;
                    string uniqueName = obj.SubmissionViewModel.UserId.ToString() + "_" + TestCaseFile.ProblemId.ToString() + "_" + TestCaseFile.ProblemTestCaseId + "_" + Guid.NewGuid().ToString() + ".txt";
                    userOutputPath = Path.Combine(baseUrl, @"User\" + obj.SubmissionViewModel.UserId.ToString() + @"\" + uniqueName);
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
                        string tempPath = Path.Combine(baseUrl, @"User\" + obj.SubmissionViewModel.UserId.ToString() + @"\temp.txt");
                        try
                        {
                            StreamWriter sw = new StreamWriter(tempPath);
                            sw.WriteLine(output);
                            sw.Close();
                        }
                        catch (Exception e)
                        {
                            Debug.WriteLine("Exception: " + e.Message);
                        }

                        // comparison of the file userout.txt with the true output of the test cases
                        string userOut = "";
                        bool match = false;
                        try
                        {
                            StreamReader UserOutSR = new StreamReader(tempPath);
                            for (int i = 0; i < 6; i++)
                            {
                                var a=UserOutSR.ReadLine();
                            }
                            userOut = UserOutSR.ReadLine();
                            if (string.Equals(userOut, trueOut))
                            {
                                match = true;
                            }
                            UserOutSR.Close();
                        }
                        catch (Exception e)
                        {
                            Debug.WriteLine("Exception: " + e.Message);
                        }

                        // writing the result of the test case in result.txt for a specific user in his directory
                        if (match)
                        {
                            try
                            {
                                StreamWriter sw = System.IO.File.AppendText(userOutputPath);
                                sw.WriteLine(userOut);
                                sw.Close();
                            }
                            catch (Exception e)
                            {
                                Debug.WriteLine("Exception: " + e.Message);
                            }
                            successTestCaseCount++;
                        }
                        else
                        {
                            try
                            {
                                StreamWriter sw = System.IO.File.AppendText(userOutputPath);
                                sw.WriteLine(userOut);
                                sw.Close();
                            }
                            catch (Exception e)
                            {
                                Debug.WriteLine("Exception: " + e.Message);
                            }
                            failTestCaseCount++;
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

                    // puuting up more single-result view model properties
                    ResultTestCaseFile.Status = "SuccessTestCaseCount: " + successTestCaseCount + "\nFailedTestCaseCount: " + failTestCaseCount;
                    ResultTestCaseFile.UserOutputFilePath = uniqueName;

                    // adding the single-resul view model in the compiler output view model
                    Result.TestcasesResult.Add(ResultTestCaseFile);
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
            }
            // return the over-all result back to the user
            return Ok(Result);
        }
    }
}