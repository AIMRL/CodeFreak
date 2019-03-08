using CodeFreak1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace CodeFreak1.Repositories
{
    public class UserRepository
    {
        private DBCodeFreakContext db;

        public UserRepository()
        {
            db = new DBCodeFreakContext();
        }
        public Users InsertUser(Users user)
        {
            if (getByEmail(user.Email) != null)
            {
                return null;
            }
            db.Users.Add(user);
            db.SaveChanges();

            //Add user Role
            Roles role = db.Roles.FirstOrDefault(r => r.Name.ToLower() == "user");
            UserRoles userRole = new UserRoles();
            userRole.UserId = user.UserId;
            userRole.RoleId = role.RoleId;
            db.UserRoles.Add(userRole);
            db.SaveChanges();

            return user;
        }
        public void UpdateUserPassword(Users user)
        {

            Users userTo = db.Users.FirstOrDefault(u => u.Login.ToLower() == user.Login.ToLower());

       

            if(userTo.Login.Equals(user.Login))
            {
                userTo.Password = user.Password;

                db.Users.Update(userTo);
                db.SaveChanges();
            }
        }

        public void UpdateUserPersonalInfo(Users user)
        {

            Users userTo = db.Users.FirstOrDefault(u => u.Login.ToLower() == user.Login.ToLower());



            if (userTo.Login.Equals(user.Login))
            {
                userTo.Email = user.Email;
                userTo.Name = user.Name;

                db.Users.Update(userTo);
                db.SaveChanges();
            }
        }


        public Users getByEmail(string email)
        {
            return db.Users.FirstOrDefault(u => u.Email.ToLower() == email.ToLower());
        }
        public Users getByEmailPassword(string email,string password)
        {
            return db.Users.Include(o=>o.UserRoles).FirstOrDefault(u => u.Email.ToLower() == email.ToLower() && u.Password == password);
        }

        public Users getUserById(Guid id)
        {
            //Guid g = Guid.Empty;
            //Guid.TryParse("0e984725-c51c-4bf4-9960-e1c80e27aba0", out g);
            Users user = new Users();
            
            var userRoles = db.UserRoles.Include(o => o.User).Include(o => o.Role).Where(ur => ur.UserId == id).ToList();
            if (userRoles.Count > 0)
            {
                user = userRoles.FirstOrDefault().User;

                foreach (var item in userRoles)
                {
                    db.PermissionsMapping.Include(pm => pm.Role).Include(pm => pm.Permission).Where(pm => pm.RoleId == item.RoleId).ToList();
                    //    var rolePermissions = db.PermissionsMapping.Include(pm => pm.Role).Include(pm => pm.Permission).Where(pm => pm.RoleId == item.RoleId).ToList();
                    //    foreach (var rp in rolePermissions)
                    //    {
                    //        item.Role.PermissionsMapping.Add(rp);
                    //    }

                }
                user.UserRoles = userRoles;
            }
            return user;

        }
    }
}
