using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CodeFreak1.App;
using CodeFreak1.Filters;
using CodeFreak1.Models;
using CodeFreak1.Repositories;
using CodeFreak1.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using AutoMapper;
namespace CodeFreak1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private UserRepository userRepository = new UserRepository();

        [HttpPost("token")]
        [Route("token")]
        [AllowAnonymous]
        public IActionResult Token(SignInViewModel credential)
        {
            if(credential==null || string.IsNullOrEmpty(credential.Password) || string.IsNullOrEmpty(credential.Email))
            {
                UsersViewModel result = new UsersViewModel();
                result.Success = false;
                result.Error = "User credentials are null";
                return Ok(result);
            }
            var user = userRepository.getByEmailPassword(credential.Email, credential.Password);
            if (user == null)
            {
                UsersViewModel result = new UsersViewModel();
                result.Success = false;
                result.Error = "Invalid User Credentials";
                return Ok(result);
            }
            //User authenticated successfully
            user = userRepository.getUserById(user.UserId);
            string tokenString = generateToken(user.Name, user.Email,user.UserId,60);
            //make the userViewModel
            UserRolesViewModel userRolesViewModel = CodeFreakMapper.UsersToUserRolesViewModel(user);
            userRolesViewModel.Token = tokenString;
            userRolesViewModel.Success = true;

            UserIdentity userIdentity = new UserIdentity();
            userIdentity.UserRolesIdentity = userRolesViewModel;
            Claim claim = new Claim("user", userRolesViewModel.User.UserId.ToString());
            userIdentity.AddClaim(claim);
            User.AddIdentity(userIdentity);

            


            return Ok(userRolesViewModel);
        }
        private string generateToken(string name,string email,Guid id,int expires)
        {
            var configuration = ConfigurationMang.GetConfiguration();
            var userClaim = new[]
            {
                new Claim(ClaimTypes.Name,"user"),
                new Claim(ClaimTypes.Name,name),
                new Claim(ClaimTypes.Email,email),
                new Claim("userId",id.ToString()),
            };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MySuperSecureKey"));

            var token = new JwtSecurityToken(
                issuer: configuration.GetConnectionString("BasePath"),
                audience: configuration.GetConnectionString("BasePath"),
                expires: DateTime.Now.AddMinutes(expires),
                claims: userClaim,
                signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
                );
            string tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenString;
        }


        [HttpGet]
        [Route("getValue")]
        [Authorise]
        public IActionResult getValue()
        {
            Users user = getApplicationUser();
            return Ok("token");
        }
        private Users getApplicationUser()
        {
            var identity = User.Identities.FirstOrDefault(s => s.Name.ToLower() == "user");
            var claims = identity.Claims;
            string id = null;
            foreach (var c in claims)
            {
                if (c.Type == "userId")
                {
                    id = c.Value;
                }
            }
            Users user = null;
            if (id != null)
            {
                user = userRepository.getUserById(new Guid(id));
            }
            return user;
        }
    }
}