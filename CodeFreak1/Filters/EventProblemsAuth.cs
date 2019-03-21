using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CodeFreak1.Models;
using CodeFreak1.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CodeFreak1.Filters
{
    public class EventProblemsAuth: Attribute, IAuthorizationFilter
    {
        EventRepository eventRepository = new EventRepository();

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            Guid userId = getApplicationUser(context.HttpContext.User);
            int eventId = Convert.ToInt32(context.HttpContext.Request.Query["eventId"].FirstOrDefault());
            EventUsers eventUsers = eventRepository.getEventUserByIds(userId, eventId);
            if (eventUsers == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }
            var userRoles = eventRepository.getEventUserRoleByEventUserId(eventUsers.EventUserId);
            bool isMofidier = false;
            foreach (var item in userRoles)
            {
                if (item.Role.Name.ToLower() == "event creator" || item.Role.Name.ToLower() == "event modifier" || item.Role.Name.ToLower() == "event roles modifier")
                {
                    isMofidier = true;
                    return;
                }
            }

            if (!isMofidier)
            {
                var eve = eventRepository.getEventById(eventId, userId);
                if (eve.Event.StartDateTime < DateTime.UtcNow)
                {
                    context.Result = new UnauthorizedResult();
                }
            }


        }
        private Guid getApplicationUser(ClaimsPrincipal User)
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

            return (new Guid(id));
        }
    }
}
