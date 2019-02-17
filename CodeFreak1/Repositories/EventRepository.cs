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
    }
}
