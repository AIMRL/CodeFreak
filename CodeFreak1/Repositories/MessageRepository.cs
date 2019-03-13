using CodeFreak1.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.Repositories
{
    public class MessageRepository
    {

        private DBCodeFreakContext db;

        public MessageRepository()
        {
            db = new DBCodeFreakContext();
        }
        public int addMessage(Messages message)
        {
            int status = 0;

            db.Messages.Add(message);
            db.SaveChanges();

            return status;
        }

        public List<Messages> getAllMessages(Guid uId)
        {

            return db.Messages.Include(p => p.Sender).Include(p => p.Reciever).Where(s => (s.SenderId == uId||s.RecieverId==uId)).OrderBy(s=>s.DateOfText).ToList<Messages>();
        }


    }
}
