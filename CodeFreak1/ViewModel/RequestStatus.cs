using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class RequestStatus
    {
   

        public bool Success { get; set; }
        public string Error { get; set; }
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public RequestStatus()
        {
            Success = false;
            Error = "";
            StatusCode= 0;
            Message = "";
        }
        public void makeSuccess()
        {
            Success = true;
            Error = "No Error";
            StatusCode = 200;
            Message = "Successfully";
        }
        public void ItemNotFound()
        {
            Success = false;
            Error = "Record Not Found";
            StatusCode = 404;
        }
    }
}
