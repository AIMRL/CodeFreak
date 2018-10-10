using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.Core
{
    public interface IRsaKeyProvider
    {
        string generateToken(string name,string email);
        bool validateToken(string tokenString);
    }
}
