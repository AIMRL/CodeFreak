using CodeFreak1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
            db.Problem.Add(problem);
            db.SaveChanges();
            return problem;
        }
        public Problem getProblemByName(string name)
        {
            return db.Problem.FirstOrDefault(p => p.Title.ToLower() == name.ToLower());
        }
        public Problem getProblemById(Guid id)
        {
            Problem problem = db.Problem.Include(p => p.Difficulty).Include(p => p.ProblemType).FirstOrDefault(p => p.ProblemId == id);
            return problem;

        }

        public List<Problem> getAllProblems()
        {
            return db.Problem.Include(p => p.Difficulty).Include(p => p.ProblemType).ToList();
        }
    }
}
