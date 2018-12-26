using CodeFreak1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.Repositories
{
    public class LanguageRepository
    {
        DBCodeFreakContext db = new DBCodeFreakContext();
        public List<ProgrammingLanguage> GetProgrammingLanguages()
        {
            return db.ProgrammingLanguage.ToList();
        }

        public string GetProgrammingLanguageName(int id)
        {
            ProgrammingLanguage language = new ProgrammingLanguage();

            language = db.ProgrammingLanguage.Where(s => s.LanguageId == id).FirstOrDefault();

            return language.Name;
        }

    }
}
