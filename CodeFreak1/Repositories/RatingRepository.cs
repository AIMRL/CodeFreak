using CodeFreak1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.Repositories
{
    public class RatingRepository
    {
        private DBCodeFreakContext db;

        public RatingRepository()
        {
            db = new DBCodeFreakContext();
        }

        public int addRating(Rating rat)
        {
            int status = 0;

            db.Rating.Add(rat);
            db.SaveChanges();

            return status;
        }

        public Rating getRatingById(Guid id)
        {
            Rating rat = db.Rating.Where(s => s.RatingId == id).FirstOrDefault<Rating>();

            return rat;
        }




    }
}
