using CodeFreak1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.Repositories
{
    public class CommentRepository
    {
        private DBCodeFreakContext db;

        public CommentRepository()
        {
            db = new DBCodeFreakContext();
        }
        public int addComment(Comment comment)
        {
            int status = 0;

            db.Comment.Add(comment);
            db.SaveChanges();

            return status;
        }
    }
}
