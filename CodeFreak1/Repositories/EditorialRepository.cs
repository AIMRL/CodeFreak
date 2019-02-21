using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeFreak1.Models;
using Microsoft.EntityFrameworkCore;
namespace CodeFreak1.Repositories
{
    public class EditorialRepository
    {
        private DBCodeFreakContext db;
        public EditorialRepository()
        {
            db = new DBCodeFreakContext();
        }
        public Editorial insertEditorial(Editorial editorial)
        {
            db.Editorial.Add(editorial);
            db.SaveChanges();
            return editorial;
        }

    }
}
