using CodeFreak1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.Repositories
{
    public class ProblemRepository
    {
        private DBCodeFreakContext db;

        public ProblemRepository()
        {
            db = new DBCodeFreakContext();
        }

        public Problem InsertProblem(Problem problem)
        {
            Difficulty diff = new Difficulty();


           // diff.Name = "sample name";
            //diff.Description = "sample description";


            //db.Difficulty.Add(diff);

            db.Problem.Add(problem);

            db.SaveChanges();


            return problem;
        }

        public Problem getProblemById(Guid id)
        {
            //Guid g = Guid.Empty;
            //Guid.TryParse("0e984725-c51c-4bf4-9960-e1c80e27aba0", out g);

            Problem problem = new Problem();





            //var userRoles = db.UserRoles.Include(o => o.User).Include(o => o.Role).Where(ur => ur.UserId == id).ToList();


            //if (userRoles.Count > 0)
            //{
            //    user = userRoles.FirstOrDefault().User;

            //    foreach (var item in userRoles)
            //    {
            //        db.PermissionsMapping.Include(pm => pm.Role).Include(pm => pm.Permission).Where(pm => pm.RoleId == item.RoleId).ToList();
            //        //    var rolePermissions = db.PermissionsMapping.Include(pm => pm.Role).Include(pm => pm.Permission).Where(pm => pm.RoleId == item.RoleId).ToList();
            //        //    foreach (var rp in rolePermissions)
            //        //    {
            //        //        item.Role.PermissionsMapping.Add(rp);
            //        //    }

            //    }
            //    user.UserRoles = userRoles;
            //}

            return problem;

        }
    }
}
