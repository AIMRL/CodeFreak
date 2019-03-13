using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeFreak1.Models;
using Microsoft.EntityFrameworkCore;
namespace CodeFreak1.Repositories
{
    public class RoleRepository
    {
        DBCodeFreakContext db = new DBCodeFreakContext();

        public Roles getRoleById(int id)
        {
            return db.Roles.FirstOrDefault(r => r.RoleId == id);
        }
        public List<Roles> getEventRoles()
        {
            return db.Roles.Where(r => r.Name.Contains("Event")).ToList();
        }
    }
}
