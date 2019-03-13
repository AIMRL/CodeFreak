using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CodeFreak1.Models;
using CodeFreak1.Repositories;
using CodeFreak1.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodeFreak1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        RoleRepository roleRepository = new RoleRepository();

        [HttpGet("getAllRoles")]
        [Route("getAllRoles")]
        public IActionResult getEventRoles()
        {
            List<Roles> roles = roleRepository.getEventRoles();
            var rolesView=Mapper.Map<List<Roles>, List<RolesViewModel>>(roles);
            return Ok(rolesView);
        }
    }
}