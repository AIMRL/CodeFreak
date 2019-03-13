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
    public class EventController : ControllerBase
    {
        EventRepository eveRep = new EventRepository();
        UserRepository userRepository = new UserRepository();
        RoleRepository roleRepository = new RoleRepository();
        [Route("addEvent")]
        [HttpPost("addEvent")]
        public IActionResult addEvent(EventViewModel eventViewModel)
        {
            if (eventViewModel == null || eventViewModel.Name == null) {
                RequestStatus requestStatus = new RequestStatus();
                requestStatus.makeObjectNull();
                return Ok(requestStatus);
            }
            try
            {
                Event isExistEev = eveRep.getEventByName(eventViewModel.Name);
                if (isExistEev != null)
                {
                    RequestStatus requestStatus = new RequestStatus();
                    requestStatus.makeNameAlreadyEist();
                    return Ok(requestStatus);
                }
                Event eve = Mapper.Map<EventViewModel, Event>(eventViewModel);
                Users curUser = getApplicationUser();
                eve.CreatedBy = curUser.UserId;
                eve.CreatedOn = DateTime.Now;
                eve.IsActive = true;
                eve = eveRep.AddEvent(eve);
                EventViewModel addedEvent = Mapper.Map<Event, EventViewModel>(eve);
                addedEvent.makeSuccess();
                return Ok(addedEvent);

            }
            catch (Exception ex)
            {
                RequestStatus requestStatus = new RequestStatus();
                requestStatus.makeFailed(ex.Message);
                return Ok(requestStatus);
            }
        }

        [Route("getEvent")]
        [HttpGet("getEvent")]
        public IActionResult getEventById(int id)
        {
            Users user = getApplicationUser();
            EventUsers eve = eveRep.getEventById(id,user.UserId);
            if (eve == null)
            {
                RequestStatus requestStatus = new RequestStatus();
                requestStatus.ItemNotFound();
                return Ok(requestStatus);
            }
            List<EventUserRoles> eventUserRoles = eveRep.getEventUserRoleByEventUserId(eve.EventUserId);
            EventUserViewModel eventUserViewModel = new EventUserViewModel();
            eventUserViewModel.Event = Mapper.Map<Event, EventViewModel>(eve.Event);
            eventUserViewModel.User = Mapper.Map<Users, UsersViewModel>(eve.User);
            eventUserViewModel.Roles = new List<RolesViewModel>();

            foreach (var item in eventUserRoles)
            {
                eventUserViewModel.Roles.Add(Mapper.Map<Roles, RolesViewModel>(item.Role));
            }
            eventUserViewModel.User.makeSuccess();
            eventUserViewModel.Event.makeSuccess();
            eventUserViewModel.makeSuccess();

            return Ok(eventUserViewModel);
        }
        [HttpPost("addEventProblem")]
        [Route("addEventProblem")]
        public IActionResult addEventProblem(EventProblemsViewModel eventProblemsViewModel)
        {
            RequestStatus requestStatus = new RequestStatus();
            if (eventProblemsViewModel == null)
            {
                requestStatus.makeObjectNull();
                return Ok(requestStatus);
            }
            EventProblems eventProblems = eveRep.getEventProblemByIdEventIdProblemId(eventProblemsViewModel.EventId, eventProblemsViewModel.ProblemId);
            if (eventProblems != null)
            {
                requestStatus.makeNameAlreadyEist();
                return Ok(requestStatus);
            }
            EventProblems eventProblem = Mapper.Map<EventProblemsViewModel, EventProblems>(eventProblemsViewModel);
            eventProblem.EventProblemId = Guid.NewGuid();
            EventProblems insertedEventProblems = eveRep.insertEventProblem(eventProblem);
            EventProblemsViewModel inserted = Mapper.Map<EventProblems, EventProblemsViewModel>(insertedEventProblems);
            inserted.makeSuccess();
            return Ok(inserted);
        }
        [HttpPost("deleteEventProblem")]
        [Route("deleteEventProblem")]
        public IActionResult deleteEventProblem(EventProblemsViewModel eventProblemsViewModel)
        {
            RequestStatus requestStatus = new RequestStatus();
            if (eventProblemsViewModel == null)
            {
                requestStatus.makeObjectNull();
                return Ok(requestStatus);
            }
            EventProblems eventProblem = eveRep.getEventProblemByIdEventIdProblemId(eventProblemsViewModel.EventId, eventProblemsViewModel.ProblemId);
            EventProblems removedEventProblems = eveRep.removeEventProblem(eventProblem);
            EventProblemsViewModel removed = Mapper.Map<EventProblems, EventProblemsViewModel>(removedEventProblems);
            removed.makeSuccess();
            return Ok(removed);
        }
        [HttpGet("getEventProblems")]
        [Route("getEventProblems")]
        public IActionResult getEventProblems(int eventId)
        {
            var list = eveRep.getProblemsByEventId(eventId);
            List<ProblemCompleteViewModel> problems = new List<ProblemCompleteViewModel>();
            foreach (var item in list)
            {
                ProblemCompleteViewModel problemListViewModel = new ProblemCompleteViewModel();
                problemListViewModel.Problem = Mapper.Map<Problem, ProblemViewModel>(item);
                problemListViewModel.Difficulty = Mapper.Map<Difficulty, DifficultyViewModel>(item.Difficulty);
                problemListViewModel.ProblemType = Mapper.Map<ProblemType, ProblemTypeViewModel>(item.ProblemType);
                problems.Add(problemListViewModel);
            }
            return Ok(problems);
        }
        [HttpGet("getEventSubmissions")]
        [Route("getEventSubmissions")]
        public IActionResult getEventSubmissions(int eventId)
        {
            List<Submission> submissions = eveRep.getEventSubmissions(eventId);
            List<CompleteSubmissionViewModel> submissionsViewModel = new List<CompleteSubmissionViewModel>();
            foreach (var item in submissions)
            {
                CompleteSubmissionViewModel submission = new CompleteSubmissionViewModel();
                submission.Submission = Mapper.Map<Submission, SubmissionViewModel>(item);
                submission.Problem = Mapper.Map<Problem, ProblemViewModel>(item.Problem);
                submission.User = Mapper.Map<Users, UsersViewModel>(item.User);
                submission.Language = Mapper.Map<ProgrammingLanguage, ProgrammingLanguageViewModel>(item.Language);
                submissionsViewModel.Add(submission);
            }
            return Ok(submissionsViewModel);
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

        [HttpPost("addEventUser")]
        [Route("addEventUser")]
        public IActionResult addEventUser(EventUserViewModel eventUserRoles)
        {
            RequestStatus requestStatus = new RequestStatus();
            if (eventUserRoles== null || eventUserRoles.Roles== null || eventUserRoles.Event== null || eventUserRoles.User== null)
            {
                requestStatus.makeObjectNull();
                return Ok(requestStatus);
            }

            EventUsers isExist = eveRep.getEventUserByIds(eventUserRoles.User.UserId, eventUserRoles.Event.EventId);
            if (isExist != null)
            {
                requestStatus.makeNameAlreadyEist();
                return Ok(requestStatus);
            }
            EventUsers eventUsers = new EventUsers();
            eventUsers.EventId = eventUserRoles.Event.EventId;
            eventUsers.UserId = eventUserRoles.User.UserId;
            eventUsers.EventUserId = Guid.NewGuid();

            EventUsers res = eveRep.addEventUser(eventUsers);
            if (res == null)
            {
                requestStatus.makeFailed("Server error");
                return Ok(requestStatus);
            }

            List<RolesViewModel> roles = new List<RolesViewModel>();

            foreach (var item in eventUserRoles.Roles)
            {
                Roles role = roleRepository.getRoleById(item.RoleId);
                if (role != null)
                {
                    EventUserRoles toInsert = new EventUserRoles();
                    toInsert.EventUserId = res.EventUserId;
                    toInsert.RoleId = item.RoleId;
                    toInsert.EventUserRoleId = Guid.NewGuid();
                    eveRep.addEventUserRole(toInsert);

                    roles.Add(Mapper.Map<Roles,RolesViewModel>(role));
                }
            }
            var user = userRepository.getPublicUserInfoById(res.UserId);
            EventUserViewModel finalResult = new EventUserViewModel();
            finalResult.Roles = roles;
            finalResult.User = Mapper.Map<Users, UsersViewModel>(user);
            finalResult.UserImage = Mapper.Map<Files, FileViewModel>(user.Files.FirstOrDefault());
            finalResult.Event = Mapper.Map<Event, EventViewModel>(eveRep.getOnlyEventById(res.EventId));
            finalResult.makeSuccess();

            return Ok(finalResult);
        }

        [HttpPost("getEventUsers")]
        [Route("getEventUsers")]
        public IActionResult getEventUsers(int eventId)
        {
            var res = eveRep.getAllUserOfEvent(eventId);
            var eventRoles = roleRepository.getEventRoles();
            List<EventUserViewModel> list = new List<EventUserViewModel>();
            foreach (var item in res)
            {
                EventUserViewModel eventUserViewModel = new EventUserViewModel();
                eventUserViewModel.User = Mapper.Map<Users, UsersViewModel>(item.User);
                eventUserViewModel.UserImage = Mapper.Map<Files, FileViewModel>(item.User.Files.FirstOrDefault());
                eventUserViewModel.Event = Mapper.Map<Event, EventViewModel>(item.Event);
                eventUserViewModel.Roles = new List<RolesViewModel>();
                foreach (var r in item.EventUserRoles)
                {
                    Roles role = eventRoles.FirstOrDefault(rr => rr.RoleId == r.RoleId);
                    eventUserViewModel.Roles.Add(Mapper.Map<Roles, RolesViewModel>(role));
                }

                list.Add(eventUserViewModel);
            }

            return Ok(list);
        }

        [HttpGet("removeEventUser")]
        [Route("removeEventUser")]
        public IActionResult removeEventUser(int eventId,Guid userId)
        {
            RequestStatus requestStatus = new RequestStatus();
            if(userId==null)
            {
                requestStatus.makeObjectNull();
                return Ok(requestStatus);
            }
            var res = eveRep.removeEventUser(userId, eventId);
            if (res == null)
            {
                requestStatus.makeFailed("server error");
                return Ok(requestStatus);
            }
            var user = userRepository.getPublicUserInfoById(res.UserId);
            UserInfoViewModel userInfoViewModel = new UserInfoViewModel();
            userInfoViewModel.File = Mapper.Map<Files, FileViewModel>(user.Files.FirstOrDefault());
            userInfoViewModel.User = Mapper.Map<Users, UsersViewModel>(user);
            userInfoViewModel.makeSuccess();
            return Ok(userInfoViewModel);
        }


    }
}