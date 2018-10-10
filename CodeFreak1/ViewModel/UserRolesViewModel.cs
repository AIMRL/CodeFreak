using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class UserRolesViewModel : RequestStatus
    {
        public UsersViewModel User { get; set; }
        public List<RolesPermissionsViewModel> RolePermissions { get; set; }
        public string Token { get; set; }

    }
}
