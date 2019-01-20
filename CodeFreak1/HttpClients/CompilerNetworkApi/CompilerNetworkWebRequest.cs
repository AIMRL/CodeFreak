using CodeFreak1.ViewModel;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.HttpClients.CompilerNetworkApi
{
    public class CompilerNetworkWebRequest
    {
        public static CompilerOutputViewModel CompileCPlusPlusCode(CompilerInputViewModel input)
        {

            var createRquestt = new RestRequest("Compile", Method.POST) { RequestFormat = DataFormat.Json };
            createRquestt.AddHeader("Content-Type", "application/json");
            createRquestt.AddHeader("Accept", "application/json");
            createRquestt.AddBody(input);
            try
            {
                var createRestResponset = CompilerNetworkClient.Instance.Execute(createRquestt);
                var response = createRestResponset.Content;
                var responseObject = JsonConvert.DeserializeObject<CompilerOutputViewModel>(response);
                return responseObject;
            }
            catch (Exception ex)
            {
                CompilerOutputViewModel compilerResult = new CompilerOutputViewModel();
                compilerResult.Error = ex.Message;
                compilerResult.StatusCode = 404;
                return compilerResult;
            }
        }
    }
}
