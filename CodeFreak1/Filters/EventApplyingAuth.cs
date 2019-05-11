using CodeFreak1.Models;
using CodeFreak1.Repositories;
using CodeFreak1.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Internal;
using System.Text;

namespace CodeFreak1.Filters
{
    public class EventApplyingAuth : Attribute, IAuthorizationFilter
    {
        EventRepository eventRepository = new EventRepository();

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            Guid userId = getApplicationUser(context.HttpContext.User);

            int eventId = -1;
            var req = context.HttpContext.Request;
            req.EnableRewind();
            var e = req.Body;
            var jsonPostData = "";
            if (e != null)
            {
                using (var reader = new System.IO.StreamReader(e, Encoding.UTF8, true, 1024, true))
                {
                    jsonPostData = reader.ReadToEnd();
                    EventUserViewModel data = JsonConvert.DeserializeObject<EventUserViewModel>(jsonPostData);
                    eventId = data.Event.EventId;
                }
            }
            req.Body.Position = 0;
            if (eventId == -1)
            {
                context.Result = new UnauthorizedResult();
                return;
            }
            Event eve = eventRepository.getOnlyEventById(eventId);
            if (DateTime.UtcNow > eve.ApplyingLastDate)
            {
                context.Result = new StatusCodeResult(408);
                //context.Result = new UnauthorizedResult();
                return;
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
