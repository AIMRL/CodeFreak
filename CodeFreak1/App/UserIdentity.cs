using CodeFreak1.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CodeFreak1.App
{
    public class UserIdentity:ClaimsIdentity
    {
        public UserRolesViewModel UserRolesIdentity { get; set; }
    }
}
