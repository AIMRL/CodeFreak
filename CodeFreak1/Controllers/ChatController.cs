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
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace CodeFreak1.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    
    public class ChatController : ControllerBase
    {
        UserRepository userRepository = new UserRepository();
        MessageRepository message_repo = new MessageRepository();

        [Route("allMessages")]
        [HttpGet("allMessages")]
        public IActionResult GetCurrentUserMessagesWith(Guid userId)
        {
            Users user = getApplicationUser();

            var list = message_repo.getAllMessages(user.UserId);

            //  List<MessageCompleteViewModel> messages_list = new List<MessageCompleteViewModel>();
            MessageReturnViewModel message_list = new MessageReturnViewModel();

            foreach (var item in list)
            {
                MessageCompleteViewModel messageListViewModel = new MessageCompleteViewModel();
                messageListViewModel.message = Mapper.Map<Messages, MessageViewModel>(item);
                messageListViewModel.sender = Mapper.Map<Users, UsersViewModel>(item.Sender);
                messageListViewModel.reciever = Mapper.Map<Users, UsersViewModel>(item.Reciever);
                if ((item.RecieverId == user.UserId && item.SenderId == userId) ||( item.SenderId == user.UserId && item.RecieverId == userId))
                {

                    message_list.Message_list.Add(messageListViewModel);

                }

            }
            message_list.currentUserId = user.UserId.ToString();

            return Ok(message_list);
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