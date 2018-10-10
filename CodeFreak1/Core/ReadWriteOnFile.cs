using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.Core
{
    public class ReadWriteOnFile
    {
        public string Read(string folderPath,string filename)
        {
            string path = Path.Combine(folderPath, filename);
            string text = string.Empty;
            try
            {
                using(var read=new StreamReader(path))
                {
                    text = read.ReadToEnd();
                }
            }
            catch
            {
            }
            return text;
        }
        public void Write(string folderPath, string filename,string text)
        {
            string path = Path.Combine(folderPath, filename);
            try
            {
                using(StreamWriter writer=new StreamWriter(path))
                {
                    writer.Write(text);
                }
            }
            catch 
            {
            }
        }
        public void CreateFileInFolder(string folderPath,string filename)
        {
            try
            {
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }
                if (!File.Exists(Path.Combine(folderPath, filename)))
                {
                    File.Create(Path.Combine(folderPath, filename));
                }
            }
            catch 
            {
            }
        }
    }
}
