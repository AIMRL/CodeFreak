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
        public int addConnection(Connection connection)
        {
            int status = 0;
            db.Connection.Add(connection);
            db.SaveChanges();

            return status;
        }
        public List<Connection> getConnectionOfUserId(Guid uid)
        {

            List<Connection> listSub = new List<Connection>();

            listSub = db.Connection.Where(s => s.UserId == uid).ToList<Connection>();

            return listSub;
        }
        public Connection getConnectionById(string connId)
        {
            Connection conn=db.Connection.Where(s => s.ConnectionId == connId).FirstOrDefault();
            return conn;

        }
    }
}
