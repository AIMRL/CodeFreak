using CodeFreak1.Models;
using CodeFreak1.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.Repositories
{
    public class DifficultyRepository
    {
        private DBCodeFreakContext db;

        public DifficultyRepository()
        {
            db = new DBCodeFreakContext();
        }

        public int addDifficulty(Difficulty diff)
        {

            int status = 0;

            db.Difficulty.Add(diff);
            db.SaveChanges();

            return status;
        }

        public Difficulty getDifficultyById(int id)
        {
            Difficulty diff = db.Difficulty.Where(s => s.DifficultyId == id).FirstOrDefault<Difficulty>();

            return diff;
        }

        public Difficulty getDifficultyByName(string name)
        {

            Difficulty diff = db.Difficulty.Where(s => s.Name == name).FirstOrDefault<Difficulty>();

            return diff;
        }



    }
}
