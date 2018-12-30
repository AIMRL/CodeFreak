using CodeFreak1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace CodeFreak1.Repositories
{
    public class ProblemTestCaseRepository
    {
        private DBCodeFreakContext db;

        public ProblemTestCaseRepository()
        {
            db = new DBCodeFreakContext();
        }

        public int addProblemTestCase(ProblemTestCase problemTestCase)
        {
            int status = 0;

            db.ProblemTestCase.Add(problemTestCase);
            db.SaveChanges();

            return status;
        }

        public ProblemTestCase getProblemTestCaseById(Guid pTestCaseId)
        {

            return db.ProblemTestCase.Where(s => s.ProblemTestCaseId == pTestCaseId).FirstOrDefault<ProblemTestCase>();
            
        }


        public List<ProblemTestCase> GetProblemTestCasesByProblemId(Guid id)
        {
            return db.ProblemTestCase.Where(pts => pts.ProblemId == id).ToList();
        }







    }
}
