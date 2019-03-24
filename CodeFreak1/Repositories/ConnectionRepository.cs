using CodeFreak1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.Repositories
{
    public class ConnectionRepository
    {
        private DBCodeFreakContext db;

        public ConnectionRepository()
        {
            db = new DBCodeFreakContext();
        }
        public List<Connection> getConnectionOfUserId(Guid id)
        {
            return db.Connection.Where(s=>s.UserId==id).ToList();
        }
        public int addConnection(Connection conn)
        {
            int status = 0;

            db.Connection.Add(conn);
            db.SaveChanges();

            return status;
        }

    }
}
