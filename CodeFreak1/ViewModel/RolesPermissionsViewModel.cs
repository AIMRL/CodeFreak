using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public class RolesPermissionsViewModel : RequestStatus
    {
        public RolesViewModel Role { get; set; }
        public List<PermissionsViewModel> Permissions { get; set; }

    }
}
