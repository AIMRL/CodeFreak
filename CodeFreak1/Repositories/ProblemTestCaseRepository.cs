using CodeFreak1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.Repositories
{
    public class ProblemTestCaseRepository
    {
        private DBCodeFreakContext db;

        public ProblemTestCaseRepository()
        {
            db = new DBCodeFreakContext();
        }

        public ProblemTestCase addProblemTestCase(ProblemTestCase problemTestCase)
        {
            db.ProblemTestCase.Add(problemTestCase);
            db.SaveChanges();
            return problemTestCase;
        }

        public ProblemTestCase getProblemTestCaseById(Guid pTestCaseId)
        {

            return db.ProblemTestCase.Where(s => s.ProblemTestCaseId == pTestCaseId).FirstOrDefault<ProblemTestCase>();
            
        }
        public List<ProblemTestCase> getProblemTestCaseByProblemId(Guid problemId)
        {

            List<ProblemTestCase> listProb = new List<ProblemTestCase>();

            listProb= db.ProblemTestCase.Where(s => s.ProblemId == problemId).ToList<ProblemTestCase>();
            return listProb;

        }









    }
}
