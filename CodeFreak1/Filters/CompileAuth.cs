using CodeFreak1.Models;
using CodeFreak1.Repositories;
using CodeFreak1.ViewModel;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CodeFreak1.Filters
{
    public class CompileAuth : Attribute, IAuthorizationFilter
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
            ProblemUserCodeViewModel data=null;
            if (e != null)
            {
                using (var reader = new System.IO.StreamReader(e, Encoding.UTF8, true, 1024, true))
                {
                    jsonPostData = reader.ReadToEnd();
                    data = JsonConvert.DeserializeObject<ProblemUserCodeViewModel>(jsonPostData);
                    eventId = data.eventId;
                }
            }
            req.Body.Position = 0;
            if (data!=null && !data.isEvent)
            {
                return;
            }
            EventUsers eventUsers = eventRepository.getEventUserByIds(userId, data.eventId);
            if (eventUsers == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            Event eve = eventRepository.getOnlyEventById(data.eventId);
            if (DateTime.UtcNow > eve.EndDateTime || DateTime.UtcNow < eve.StartDateTime)
            {
                context.Result = new StatusCodeResult(408);
                return;
            }
            //var userRoles = eventRepository.getEventUserRoleByEventUserId(eventUsers.EventUserId);
            //bool isMofidier = false;
            //foreach (var item in userRoles)
            //{
            //    if (item.Role.Name.ToLower() == "event creator" || item.Role.Name.ToLower() == "event modifier" || item.Role.Name.ToLower() == "event roles modifier")
            //    {
            //        isMofidier = true;
            //    }
            //}

            //if (!isMofidier)
            //{
            //    context.Result = new UnauthorizedResult();
            //}


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
