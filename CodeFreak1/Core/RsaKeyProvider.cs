using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace CodeFreak1.Core
{
    public class RsaKeyProvider:IRsaKeyProvider
    {
        private IConfiguration configuration;
        private string FolderPath;
        private string FileName;

        private readonly ReadWriteOnFile fileReadWrite = new ReadWriteOnFile();

        public RsaKeyProvider(IConfiguration conf)
        {
            this.configuration = conf;
            this.FolderPath = Directory.GetCurrentDirectory();
            this.FileName = this.configuration.GetConnectionString("RsaKeyFile");

            this.fileReadWrite.CreateFileInFolder(this.FolderPath, this.FileName);
        }
        private string createKey()
        {
            string key = string.Empty;
            try
            {
                using(var rsa = RSA.Create(2048))
                {
                    key = RSAKeyExtensions.ToXmlString(rsa, true);
                }
            }
            catch (Exception ex)
            {
            }
            return key;
        }
        private string generateKey()
        {
            string key = this.fileReadWrite.Read(this.FolderPath, this.FileName);
            if (string.IsNullOrEmpty(key))
            {
                //create key
                string pubPriKey = createKey();
                this.fileReadWrite.Write(this.FolderPath, this.FileName, pubPriKey);
                key = pubPriKey;
            }
            return key; 
        }
        public string generateToken(string name,string email)
        {
            string publicPrivateSecurityKey = generateKey();
            var rsaParams = new RSACryptoServiceProvider();
            rsaParams.FromXmlString(publicPrivateSecurityKey);
            var rsaSecurityKey = new RsaSecurityKey(rsaParams);
            var signingCredentials = new SigningCredentials(rsaSecurityKey, SecurityAlgorithms.RsaSha256Signature);

            var userClaim = new[]
            {
                new Claim(ClaimTypes.Name,name),
                new Claim(ClaimTypes.Email,email)
            };

            var token = new JwtSecurityToken(
                issuer: configuration.GetConnectionString("BasePath"),
                audience: configuration.GetConnectionString("BasePath"),
                expires: DateTime.Now.AddDays(1),
                claims: userClaim,
                signingCredentials: signingCredentials
                );

            string tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenString;


        }

        public bool validateToken(string tokenString)
        {
            throw new NotImplementedException();
        }
    }
}
