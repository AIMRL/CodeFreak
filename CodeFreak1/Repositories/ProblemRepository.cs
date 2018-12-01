using CodeFreak1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.Repositories
{
    public class ProblemRepository
    {
        private DBCodeFreakContext db = new DBCodeFreakContext();

        public Problem addProblem(Problem problem)
        {
            db.Problem.Add(problem);
            db.SaveChanges();
            return problem;
        }

        public Problem getProblemById(Guid id)
        {
            Problem problem = db.Problem.Where(s => s.ProblemId == id).FirstOrDefault<Problem>();
            return problem;
        }


        public Problem updateProblemById(Problem problem)
        {
            Problem prob = db.Problem.Where(s => s.ProblemId == problem.ProblemId).FirstOrDefault<Problem>();
            return problem;
        }




    }
}
