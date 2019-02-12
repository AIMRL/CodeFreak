using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CompileNetwork.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CompileNetwork.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompilerEngineController : ControllerBase
    {
        [HttpPost("Compile")]
        public ActionResult Compile(CompilerInputViewModel obj)
        {
            string baseUrl = Directory.GetCurrentDirectory();

            string studentDirectoryPath = Path.Combine(baseUrl, @"User\" + obj.SubmissionViewModel.UserId.ToString());
            try
            {
                if (Directory.Exists(studentDirectoryPath) == false)
                {
                    DirectoryInfo di = Directory.CreateDirectory(studentDirectoryPath);
                    Debug.WriteLine("The directory was created successfully at {0}.", Directory.GetCreationTime(studentDirectoryPath));
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine("The process failed: {0}", e.ToString());
            }

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

            string batchPath = Path.Combine(baseUrl, @"User\" + obj.SubmissionViewModel.UserId.ToString() + @"\Batch.bat");
            string uniqueNameError = "ERROR_" + obj.SubmissionViewModel.UserId.ToString() + "_" + obj.SubmissionViewModel.ProblemId.ToString() + "_" + obj.SubmissionViewModel.SubmissionId.ToString() + ".txt";
            try
            {
                StreamWriter sw = new StreamWriter(batchPath);
                sw.WriteLine("cd " + baseUrl + @"\User\" + obj.SubmissionViewModel.UserId.ToString());
                sw.WriteLine("g++ Code.cpp -o Code.exe 2> " + uniqueNameError);
                sw.WriteLine("IF EXIST Code.exe (");
                sw.WriteLine("Code.exe");
                sw.WriteLine(")");
                sw.Close();
            }
            catch (Exception e)
            {
                Debug.WriteLine("Exception: " + e.Message);
            }

            int testCaseCount = 0;
            string testCase, trueOut;

            bool tleError = false;
            bool compileError = false;
            bool memoryExceedError = false;

            CompilerOutputViewModel Result = new CompilerOutputViewModel();
            Result.TestcasesResult = new List<SubmissionProblemTestCaseViewModel>();

            foreach (ProblemTestCaseViewModel TestCaseFile in obj.ProblemTestCaseViewModels)
            {
                if(tleError || compileError)
                {
                    break;
                }

                try
                {
                    string problemInputsPath = Path.Combine(baseUrl, @"Problem\" + TestCaseFile.ProblemId.ToString() + @"\" + TestCaseFile.InputFilePath);
                    StreamReader TestCaseSR = new StreamReader(problemInputsPath);

                    string problemOutputsPath = Path.Combine(baseUrl, @"Problem\" + TestCaseFile.ProblemId.ToString() + @"\" + TestCaseFile.OutputFilePath);
                    StreamReader TrueOutSR = new StreamReader(problemOutputsPath);

                    testCase = TestCaseSR.ReadLine();
                    testCaseCount++;

                    trueOut = TrueOutSR.ReadLine();

                    Process myProcess;

                    string output = "";
                    string uniqueName = "";
                    string userOutputPath = "";
                    int successTestCaseCount = 0, failTestCaseCount = 0;

                    int elapsedTime = 0;
                    bool eventHandled = false;

                    StreamWriter myStreamWriter = null;
                    StreamReader myStreamreader = null;

                    while (testCase != null && tleError == false && compileError == false && memoryExceedError == false)
                    {
                        using (myProcess = new Process())
                        {
                            try
                            {
                                myProcess.StartInfo.FileName = batchPath;
                                myProcess.StartInfo.UseShellExecute = false;
                                myProcess.StartInfo.RedirectStandardInput = true;
                                myProcess.StartInfo.RedirectStandardOutput = true;
                                myProcess.StartInfo.RedirectStandardError = true;

                                myProcess.EnableRaisingEvents = true;
                                myProcess.Exited += new EventHandler(myProcess_Exited);

                                myProcess.Start();

                                myStreamWriter = myProcess.StandardInput;
                                myStreamreader = myProcess.StandardOutput;

                                myStreamWriter.WriteLine(testCase);
                                output = myStreamreader.ReadToEnd();

                                myStreamWriter.Close();
                                myStreamreader.Close();

                                const int SleepAmount = 100;
                                while (!eventHandled && tleError == false)
                                {
                                    elapsedTime += SleepAmount;
                                    if (elapsedTime > 300)
                                    {
                                        tleError = true;
                                    }

                                    Thread.Sleep(SleepAmount);
                                }
                            }
                            catch (OutOfMemoryException e)
                            {
                                memoryExceedError = true;
                                Debug.WriteLine("Out of Memory: {0}", e.Message);
                            }
                            catch (Exception ex)
                            {
                                Debug.WriteLine($"An error occurred to process: {ex.Message}");
                            }
                        }

                        void myProcess_Exited(object sender, EventArgs e)
                        {
                            eventHandled = true;
                            Debug.WriteLine(
                                $"Start time    : {myProcess.StartTime}\n" +
                                $"Exit time    : {myProcess.ExitTime}\n" +
                                $"Exit code    : {myProcess.ExitCode}\n" +
                                $"Elapsed time : {elapsedTime}");
                        }

                        string errorFilePath = Path.Combine(baseUrl, @"User\" + obj.SubmissionViewModel.UserId.ToString() + @"\" + uniqueNameError);
                        if (System.IO.File.Exists(errorFilePath) && new FileInfo(errorFilePath).Length > 0)
                        {
                            compileError = true;
                        }
                        
                        if(tleError == false && compileError == false && memoryExceedError == false)
                        {
                            uniqueName = obj.SubmissionViewModel.UserId.ToString() + "_" + TestCaseFile.ProblemId.ToString() + "_" + TestCaseFile.ProblemTestCaseId + "_" + Guid.NewGuid().ToString() + ".txt";
                            userOutputPath = Path.Combine(baseUrl, @"User\" + obj.SubmissionViewModel.UserId.ToString() + @"\" + uniqueName);

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

                            string userOut = "";
                            bool match = false;
                            try
                            {
                                StreamReader UserOutSR = new StreamReader(tempPath);
                                for (int i = 0; i < 6; i++)
                                {
                                    UserOutSR.ReadLine();
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
                            match = false;

                            testCase = TestCaseSR.ReadLine();
                            testCaseCount++;

                            trueOut = TrueOutSR.ReadLine();
                        }
                    }
                    TrueOutSR.Close();
                    TestCaseSR.Close();

                    SubmissionProblemTestCaseViewModel ResultTestCaseFile = new SubmissionProblemTestCaseViewModel();
                    ResultTestCaseFile.SubmissionProblemTestCaseId = Guid.NewGuid().ToString();
                    ResultTestCaseFile.SubmissionId = obj.SubmissionViewModel.SubmissionId;
                    ResultTestCaseFile.ProblemTestCaseId = TestCaseFile.ProblemTestCaseId.ToString();
                    ResultTestCaseFile.Status = "SuccessTestCaseCount: " + successTestCaseCount + "\nFailedTestCaseCount: " + failTestCaseCount;
                    ResultTestCaseFile.UserOutputFilePath = uniqueName;

                    Result.TestcasesResult.Add(ResultTestCaseFile);
                }
                catch (Exception e)
                {
                    Debug.WriteLine("Exception: " + e.Message);
                }
                finally
                {
                    
                }
            }
            return Ok(Result);
        }
    }
}