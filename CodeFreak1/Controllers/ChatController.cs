using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using CodeFreak1.Hubs;
using CodeFreak1.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net;
using CodeFreak1.Models;
using CodeFreak1.Repositories;

namespace CodeFreak1.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        UserRepository userRepository = new UserRepository();
        private IHubContext<MesaageHub, ITypedHub> _hubContext;
        public ChatController(IHubContext<MesaageHub, ITypedHub> hubContext)
        {
            _hubContext = hubContext;

        }

        [HttpPost]
        public OkObjectResult Post([FromBody]MessageViewModel msg)
        {
            string retMessage = string.Empty;
            Users user = getApplicationUser();

            try
            {
                _hubContext.Clients.All.BroadcastMessage("hi this time from server "+user.Name.ToString());

                // _hubContext.Clients.All.BroadcastMessage(msg);
                retMessage = "Success";
            }
            catch (Exception e)
            {
                retMessage = e.ToString();
            }
            return Ok("hello");
        }
        public Users getApplicationUser()
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