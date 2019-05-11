using CodeFreak1.Models;
using CodeFreak1.Repositories;
using CodeFreak1.ViewModel;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CodeFreak1.Filters
{
    public class EventProblemCDAuth: Attribute, IAuthorizationFilter
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
                    EventProblemsViewModel data = JsonConvert.DeserializeObject<EventProblemsViewModel>(jsonPostData);
                    eventId = data.EventId;
                }
            }
            req.Body.Position = 0;
            if (eventId == -1)
            {
                context.Result = new StatusCodeResult(404);
                return;
            }
            EventUsers eventUsers = eventRepository.getEventUserByIds(userId, eventId);
            if (eventUsers == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }
            Event eve = eventRepository.getOnlyEventById(eventId);
            if (DateTime.UtcNow > eve.EndDateTime)
            {
                //context.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Event", action = "UnAuth", area = "" }));
                //context.HttpContext.Response= new RedirectToActionResult("UnAuth", "Event", null);
                //context.Result = new RedirectToActionResult("UnAuth", "Event", null);
                //context.Result = new NotFoundResult();
                context.Result = new StatusCodeResult(408);
                //context.Result.ExecuteResultAsync(context);
                //context.Result = new UnauthorizedResult();
                return;
            }
            var userRoles = eventRepository.getEventUserRoleByEventUserId(eventUsers.EventUserId);
            bool isMofidier = false;
            foreach (var item in userRoles)
            {
                if (item.Role.Name.ToLower() == "event creator" || item.Role.Name.ToLower() == "event modifier" || item.Role.Name.ToLower() == "event roles modifier")
                {
                    isMofidier = true;
                }
            }

            if (!isMofidier)
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
