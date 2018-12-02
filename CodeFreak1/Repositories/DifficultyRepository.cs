using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeFreak1.Models;
namespace CodeFreak1.Repositories
{
    public class DifficultyRepository
    {
        DBCodeFreakContext db = new DBCodeFreakContext();
        public List<Difficulty> GetDifficulties()
        {
            return db.Difficulty.ToList();
        }

    }
}
