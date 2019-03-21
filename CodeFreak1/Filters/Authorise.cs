using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFreak1.Filters
{
    public class Authorise : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var a = context.RouteData.Values;
            var ee = context.HttpContext.Request.Headers.ToDictionary(h => h.Key, h => h.Value);
            var gg = context.HttpContext.Request.Query["eventId"];
            var v = gg.FirstOrDefault();
        }
    }
}
