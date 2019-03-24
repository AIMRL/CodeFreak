using CodeFreak1.Models;
using CodeFreak1.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.Repositories
{
    public class SubmissionRepository
    {
        private DBCodeFreakContext db;

        public SubmissionRepository()
        {
            db = new DBCodeFreakContext();
        }
        public int addSubmission(Submission submission)
        {
            int status = 0;

            db.Submission.Add(submission);
            db.SaveChanges();

            return status;
        }

        public List<ProblemSubmissionViewModel> getSubmission(Guid UserId) {
       

            return db.Submission.Where(s => s.UserId == UserId).Select(o => new ProblemSubmissionViewModel { 
              Title =o.Problem.Title,
              Name = o.Language.Name,
              Score = o.Score,
              Status = o.Status
            }).ToList();


        }

        public List<Submission> getSubmissionOfProblemId(Guid pid)
        {

            List<Submission> listSub = new List<Submission>();

            listSub = db.Submission.Where(s => s.ProblemId == pid).ToList<Submission>();

            return listSub;
        }

        public List<Submission> getSubmissionOfUserId(Guid uid)
        {

            List<Submission> listSub = new List<Submission>();

            listSub = db.Submission.Where(s => s.UserId == uid).ToList<Submission>();

            return listSub;
        }

        public List<Submission> getSubmissionOfUserIdProblemId(Guid uid,Guid pid)
        {
            List<Submission> listSub = new List<Submission>();

            listSub = db.Submission.Where(s => s.UserId == uid).Where(t => t.ProblemId == pid).ToList<Submission>();

            return listSub;

        }



        public Submission getSubmissionDetail(Guid sid)
        {
            Submission Sub = new Submission();

            Sub = db.Submission.FirstOrDefault(s=> s.SubmissionId == sid);
        
            return Sub;

        }




    }
}
