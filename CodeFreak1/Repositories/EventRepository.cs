using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeFreak1.Models;
using Microsoft.EntityFrameworkCore;
namespace CodeFreak1.Repositories
{
    public class EventRepository
    {
        DBCodeFreakContext db= new DBCodeFreakContext();
        
        public Event AddEvent(Event eve)
        {
            if (eve == null)
                return null;
            db.Event.Add(eve);
            db.SaveChanges();
            return eve;
        }
        public Event getEventByName(string name)
        {
            return db.Event.FirstOrDefault(e => e.Name.ToLower() == name.ToLower());
        }
        public Event getEventById(int id)
        {
            return db.Event.Include(e=>e.CreatedByNavigation).FirstOrDefault(e => e.EventId == id);
        }

        public EventProblems insertEventProblem(EventProblems eventProblem)
        {
            db.EventProblems.Add(eventProblem);
            db.SaveChanges();
            return eventProblem;
        }
        public EventProblems getEventProblemByIdEventIdProblemId(int eventId,Guid problemId)
        {
            return db.EventProblems.FirstOrDefault(ep => ep.EventId == eventId && ep.ProblemId == problemId);
        }
        public List<Problem> getProblemsByEventId(int id)
        {
            var eventProblems = db.EventProblems.Where(e => e.EventId == id).Include(e => e.Problem).Include(e => e.Problem.ProblemType).Include(e => e.Problem.Difficulty).ToList();
            List<Problem> list = new List<Problem>();
            foreach (var item in eventProblems)
            {
                list.Add(item.Problem);
            }
            return list;
        }



    }
}
