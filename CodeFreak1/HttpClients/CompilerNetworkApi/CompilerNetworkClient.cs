using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.HttpClients.CompilerNetworkApi
{
    public class CompilerNetworkClient
    {
        private CompilerNetworkClient()
        {
                
        }
        public static RestClient Instance { get; } = new RestClient("http://localhost:8081/api/CompilerEngine");
    }
}
