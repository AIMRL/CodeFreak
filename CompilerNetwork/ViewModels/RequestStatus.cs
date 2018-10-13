using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompileNetwork.ViewModel
{
    public class RequestStatus
    {
        public bool Success { get; set; }
        public string Error { get; set; }
        public int StatusCode { get; set; }

        public RequestStatus()
        {
            Success = false;
            Error = "";
            StatusCode= 0;
        }
    }
}
