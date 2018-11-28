using CodeFreak1.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.Models
{
    public class UsersConversion
    {
        public Users ToModel(UsersViewModel userViewModel)
        {
            Users users = new Users();

            return users;
        }

        public UsersViewModel ToViewModel(Users users)
        {
            UsersViewModel usermodel = new UsersViewModel();

            usermodel.UserId = users.UserId;
            usermodel.Login = users.Login;
            usermodel.Password = users.Password;
            usermodel.Name = users.Name;
            usermodel.Email = users.Email;
            usermodel.CreatedOn = users.CreatedOn;
            usermodel.CreatedBy = users.CreatedBy;
            usermodel.IsActive = users.IsActive;
            usermodel.CreatedBy = users.CreatedBy;
            usermodel.ModifieBy = users.ModifieBy;

            return usermodel;
        }


    }
}
