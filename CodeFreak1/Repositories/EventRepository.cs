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
        public EventUsers getEventById(int id,Guid userId)
        {
            return db.EventUsers.Include(eu => eu.Event).Include(eu => eu.User).FirstOrDefault(eu => eu.UserId == userId && eu.EventId == id);
            //return db.Event.Include(e=>e.CreatedByNavigation).FirstOrDefault(e => e.EventId == id);
        }
        public List<EventUserRoles> getEventUserRoleByEventUserId(Guid id)  
        {
            return db.EventUserRoles.Where(eur => eur.EventUserId == id).Include(eur => eur.Role).ToList();
        }
        public EventUsers getEventUserByIds(Guid userId,int eventId)
        {
            return db.EventUsers.FirstOrDefault(eu => eu.EventId == eventId && eu.UserId == userId);
        }
        public EventUsers addEventUser(EventUsers eventUsers)
        {
            try
            {
                db.EventUsers.Add(eventUsers);
                db.SaveChanges();
                return eventUsers;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public EventUserRoles addEventUserRole(EventUserRoles eventUserRole)
        {
            try
            {
                db.EventUserRoles.Add(eventUserRole);
                db.SaveChanges();
                return eventUserRole;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public EventProblems insertEventProblem(EventProblems eventProblem)
        {
            db.EventProblems.Add(eventProblem);
            db.SaveChanges();
            return eventProblem;
        }
        public Event getOnlyEventById(int id)
        {
            return db.Event.FirstOrDefault(e => e.EventId == id);
        }
        public EventProblems removeEventProblem(EventProblems eventProblem)
        {
            db.EventProblems.Remove(eventProblem);
            db.SaveChanges();
            return eventProblem;
        }
        public List<Submission> getEventSubmissions(int id)
        {
            return db.Submission.Where(s => s.EventId == id).Include(s => s.User).Include(s => s.Problem).Include(s => s.Language).ToList();
        }

        public List<EventUsers> getAllUserOfEvent(int eventId)
        {
            //          (from eu in db.EventUsers join e in db.Event on eu.EventId equals e.EventId join u in db.Users)
            return db.EventUsers.Where(eu => eu.EventId == eventId).Include(e => e.Event).Include(e => e.User).
                ThenInclude(u=>u.Files).Include(e => e.EventUserRoles).
                Select(eu => new EventUsers
                {
                    Event = eu.Event,
                    EventId = eu.EventId,
                    EventUserId = eu.EventUserId,
                    EventUserRoles = eu.EventUserRoles,
                    User = new Users
                    {
                        UserId = eu.User.UserId,
                        Email = eu.User.Email,
                        Name = eu.User.Name,
                        Files=eu.User.Files
                    },
                    UserId = eu.UserId
                }).ToList();
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

        public EventUsers removeEventUser(Guid userId,int eventId)
        {
            var eventUser = db.EventUsers.FirstOrDefault(eu => eu.UserId == userId && eu.EventId == eventId);
            if (eventUser == null)
                return null;
            var roles = db.EventUserRoles.Where(e => e.EventUserId == eventUser.EventUserId).ToList();
            db.EventUserRoles.RemoveRange(roles);
            db.SaveChanges();
            db.EventUsers.Remove(eventUser);
            db.SaveChanges();
            return eventUser;
        }

    }
}
