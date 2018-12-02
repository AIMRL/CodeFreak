using CodeFreak1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.Repositories
{
    public class ProblemTypeRepository
    {
        DBCodeFreakContext db = new DBCodeFreakContext();
        public List<ProblemType> GetProblemTypes()
        {
            return db.ProblemType.ToList();
        }
    }
}
