using CodeFreak1.Models;
using CodeFreak1.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CodeFreak1.Filters
{
    public class EventAuth:Attribute, IAuthorizationFilter
    {
        EventRepository eventRepository = new EventRepository();

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            Guid userId = getApplicationUser(context.HttpContext.User);
            int eventId = -1;
            eventId=Convert.ToInt32(context.HttpContext.Request.Query["eventId"].FirstOrDefault());
            if (eventId == -1)
            {
                var e = context.HttpContext.Request.Body;
                using (var reader = new System.IO.StreamReader(e))
                {
                    var jsonPostData = reader.ReadToEnd();
                }
            }

            EventUsers eventUsers = eventRepository.getEventUserByIds(userId, eventId);
            if (eventUsers == null)
            {
                context.Result = new UnauthorizedResult();
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
