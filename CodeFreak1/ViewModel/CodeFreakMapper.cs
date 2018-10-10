using AutoMapper;
using CodeFreak1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.ViewModel
{
    public static class CodeFreakMapper
    {
        public static UserRolesViewModel UsersToUserRolesViewModel(Users source)
        {
            UserRolesViewModel userRolesViewModel = new UserRolesViewModel();
            userRolesViewModel.User = Mapper.Map<Users, UsersViewModel>(source);
            userRolesViewModel.RolePermissions = new List<RolesPermissionsViewModel>();
            foreach (var item in source.UserRoles)
            {
                var role = item.Role;
                if (role != null)
                {
                    RolesPermissionsViewModel rolesPermissionsViewModel = new RolesPermissionsViewModel();
                    rolesPermissionsViewModel.Role = Mapper.Map<Roles, RolesViewModel>(role);
                    rolesPermissionsViewModel.Permissions = new List<PermissionsViewModel>();
                    foreach (var rolePerms in role.PermissionsMapping)
                    {
                        rolesPermissionsViewModel.Permissions.Add(Mapper.Map<Permissions, PermissionsViewModel>(rolePerms.Permission));
                    }
                    userRolesViewModel.RolePermissions.Add(rolesPermissionsViewModel);
                }
            }
            return userRolesViewModel;
        }
    }
}
