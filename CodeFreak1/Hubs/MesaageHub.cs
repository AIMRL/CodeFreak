using CodeFreak1.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeFreak1.Repositories;
using CodeFreak1.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CodeFreak1.HttpClients.CompilerNetworkApi;
using AutoMapper;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;

namespace CodeFreak1.Hubs
{
    public class MesaageHub:Hub<ITypedHub>
    {
        UserRepository userRepository = new UserRepository();
       // ConnectionRepository connection_repository = new ConnectionRepository();

        MessageRepository message_repository = new MessageRepository();

        public void sendMessage(MessageViewModel msg,string jwt)
        {

            var handler = new JwtSecurityTokenHandler();

            var token = handler.ReadToken(jwt) as JwtSecurityToken;

            var claims = token.Claims;
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
            
            msg.SenderId = user.UserId.ToString();

            Messages message = new Messages();
            message.Id = Guid.NewGuid();
            message.MessageText = msg.MessageText;
            message.RecieverId = new Guid(msg.RecieverId);
            message.SenderId = new Guid(msg.SenderId);
            message.DateOfText = System.DateTime.Now;
     

            //sends message to user 
             message_repository.addMessage(message);


          //  List<Connection> connection_list=connection_repository.getConnectionOfUserId(new Guid(msg.RecieverId));

            /*
            if (connection_list.Count != 0)
            {
                foreach( Connection conn in connection_list)
                {
                    Clients.Client(conn.ConnectionId).recieveMessage(msg);
                }
            }
            else
            {

            }*/

        }
        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception);
        }
        public void validate(string jwt)
        {

            var handler = new JwtSecurityTokenHandler();
            

            var token = handler.ReadToken(jwt) as JwtSecurityToken;
            
            var claims = token.Claims;
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
                string connectionId = Context.ConnectionId;
                var currUserName = Context.User.Identity.Name;
                //Connection connection = new Connection();
                
                //connection.ConnectionId = connectionId;
                //connection.UserId = user.UserId;
                //connection.Connected = true;
                //connection_repository.addConnection(connection);
                
            }


        }
        
    }
}
