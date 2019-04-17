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



            if (userTo.Login.Equals(user.Login))
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
        public Files addUserImage(Files file)
        {
            db.Files.Add(file);
            db.SaveChanges();
            return file;
        }

        public void removeUserImages(Guid userId)
        {
            var list = db.Files.Where(f => f.UserId == userId).ToList();
            db.Files.RemoveRange(list);
        }
        public Files getUserImage(Guid userId)
        {
            return db.Files.FirstOrDefault(f => f.UserId == userId);
        }
        public Users getByEmail(string email)
        {
            return db.Users.FirstOrDefault(u => u.Email.ToLower() == email.ToLower());
        }
        public Users getByEmailPassword(string email,string password)
        {
            return db.Users.Include(o=>o.UserRoles).FirstOrDefault(u => u.Email.ToLower() == email.ToLower() && u.Password == password);
        }
        public List<Users> getAllPublicUserInfo(int eventId)
        {
            //return db.Users.Include(u => u.Files).Include(u => u.EventUsers).ToList();
            //            return (from a in db.Users join eu in db.EventUsers on a.UserId equals eu.UserId where a.UserId!=eu.UserId select new Users { Name = a.Name, UserId = a.UserId }).Include(u=>u.Files).ToList();
            var users = (from a in db.Users select new Users { Name = a.Name, UserId = a.UserId,Email=a.Email }).Include(u => u.Files).ToList();
            var eventusers = db.EventUsers.Where(eu => eu.EventId == eventId).ToList();
            foreach (var item in eventusers)
            {
                var index = users.Find(u => u.UserId == item.UserId);
                users.Remove(index);
            }
            return users;
        }
        public Users getPublicUserInfoById(Guid userId)
        {
            var user = (from a in db.Users select new Users { Name = a.Name, UserId = a.UserId, Email = a.Email }).Include(u => u.Files).FirstOrDefault(u => u.UserId == userId);
            return user;
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
        public List<Users> getAllUsers()
        {
            return db.Users.Where(s => s.UserId != null).ToList();
        }
    }
}
