using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CodeFreak1.Filters;
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
                addEventCreatorRole(eve.EventId, eve.CreatedBy);
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
        private void addEventCreatorRole(int eventId,Guid userId)
        {
            try
            {
                EventUsers eventUser = new EventUsers();
                eventUser.EventId = eventId;
                eventUser.UserId = userId;
                eventUser.EventUserId = Guid.NewGuid();
                eveRep.addEventUser(eventUser);

                Roles role=roleRepository.getRoleByName("event creator");
                EventUserRoles eventUserRoles = new EventUserRoles();
                eventUserRoles.EventUserRoleId = Guid.NewGuid();
                eventUserRoles.EventUserId = eventUser.EventUserId;
                eventUserRoles.RoleId = role.RoleId;
                eveRep.addEventUserRole(eventUserRoles);

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [Route("getEvent")]
        [HttpGet("getEvent")]
        [EventAuth]
        public IActionResult getEventById(int eventId)
        {
            Users user = getApplicationUser();
            EventUsers eve = eveRep.getEventById(eventId,user.UserId);
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

            Files image=userRepository.getUserImage(user.UserId);
            if(image!=null)
            {
                eventUserViewModel.UserImage = Mapper.Map<Files, FileViewModel>(image);
            }
            eventUserViewModel.User.makeSuccess();
            eventUserViewModel.Event.makeSuccess();
            eventUserViewModel.makeSuccess();

            return Ok(eventUserViewModel);
        }
        [HttpPost("addEventProblem")]
        [Route("addEventProblem")]
        [EventProblemCDAuth]
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
        [EventProblemCDAuth]
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
        [EventAuth]
        [EventProblemsAuth]
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
        [EventAuth]
        [EventModifier]
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
                submission.UserImage = Mapper.Map<Files, FileViewModel>(item.User.Files.FirstOrDefault());
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
        [EventUserCDAuth]
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

        [HttpPost("applyForEvent")]
        [Route("applyForEvent")]
        [EventApplyingAuth]
        public IActionResult ApplyingUserEvent(EventUserViewModel eventUserRoles)
        {
            RequestStatus requestStatus = new RequestStatus();
            if (eventUserRoles == null || eventUserRoles.Event == null)
            {
                requestStatus.makeObjectNull();
                return Ok(requestStatus);
            }
            var user = getApplicationUser();
            EventUsers isExist = eveRep.getEventUserByIds(user.UserId, eventUserRoles.Event.EventId);
            if (isExist != null)
            {
                requestStatus.makeSuccess();
                return Ok(requestStatus);
            }
            EventUsers eventUsers = new EventUsers();
            eventUsers.EventId = eventUserRoles.Event.EventId;
            eventUsers.UserId = user.UserId;
            eventUsers.EventUserId = Guid.NewGuid();

            EventUsers res = eveRep.addEventUser(eventUsers);
            if (res == null)
            {
                requestStatus.makeFailed("Server error");
                return Ok(requestStatus);
            }
            Roles role = roleRepository.getRoleByName("Event User");
            if (role != null)
            {
                EventUserRoles eRole = new EventUserRoles();
                eRole.EventUserId = eventUsers.EventUserId;
                eRole.EventUserRoleId = Guid.NewGuid();
                eRole.RoleId = role.RoleId;
                eveRep.addEventUserRole(eRole);
            }
            requestStatus.makeSuccess();
            return Ok(requestStatus);
        }

        [HttpPost("getEventUsers")]
        [Route("getEventUsers")]
        [EventAuth]
        [EventModifier]
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

        [HttpPost("removeEventUser")]
        [Route("removeEventUser")]
        [EventUserCDAuth]
        public IActionResult removeEventUser(EventUserViewModel eventUser)
        {
            int eventId=eventUser.Event.EventId;
            Guid userId=eventUser.User.UserId;
             RequestStatus requestStatus = new RequestStatus();
            if(userId==null)
            {
                requestStatus.makeObjectNull();
                return Ok(requestStatus);
            }
            var eve = eveRep.getOnlyEventById(eventId);
            if (eve.CreatedBy == userId)
            {
                requestStatus.makeFailed("You can not remove creator of event");
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
        [HttpPost("getPendingEvents")]
        [Route("getPendingEvents")]
        public IActionResult getPendingEvents()
        {
            var events = eveRep.getPendingEvents();
            var list = Mapper.Map<List<Event>, List<EventViewModel>>(events);
            return Ok(list);
        }

        [HttpPost("getMyEvents")]
        [Route("getMyEvents")]
        public IActionResult getMyEvents()
        {
            var user = getApplicationUser();

            var events = eveRep.getMyEvents(user.UserId);
            var list = Mapper.Map<List<Event>, List<EventViewModel>>(events);
            return Ok(list);
        }
        [HttpGet("getEventCreator")]
        [Route("getEventCreator")]
        public IActionResult getEventWithCreator(int id)
        {

            var eve = eveRep.getEventCreator(id);
            if (eve == null)
            {
                RequestStatus requestStatus = new RequestStatus();
                requestStatus.ItemNotFound();
                return Ok(requestStatus);
            }
            EventUserViewModel e = new EventUserViewModel();
            e.Event=Mapper.Map<Event,EventViewModel>(eve);
            e.User = new UsersViewModel();
            e.User.Name = eve.CreatedByNavigation.Name;
            e.UserImage =Mapper.Map<Files,FileViewModel>(eve.CreatedByNavigation.Files.FirstOrDefault());
            e.makeSuccess();
            return Ok(e);
        }
        [HttpGet("getBoardResult")]
        [Route("getBoardResult")]
        public IActionResult getEventBoard(int id)
        {

            var a = eveRep.getEventBoard(id);
            List<EventPerformanceViewModel> result = new List<EventPerformanceViewModel>();
            var users = eveRep.getAllUserOfEvent(id);
            foreach (var item in users)
            {
                var filtered = a.Where(s => s.UserId == item.UserId).ToList();
                EventPerformanceViewModel eventPerformance = new EventPerformanceViewModel();
                eventPerformance.Submissions = Mapper.Map<List<Submission>, List<SubmissionViewModel>>(filtered);
                eventPerformance.NoOfSubmissions = filtered.Count;
                eventPerformance.User = Mapper.Map<Users, UsersViewModel>(item.User);
                eventPerformance.UserImage = Mapper.Map<Files, FileViewModel>(item.User.Files.FirstOrDefault());
                eventPerformance.TotalScore = filtered.Sum(r => r.Score);
                eventPerformance.makeSuccess();
                result.Add(eventPerformance);
            }
;
            result.OrderBy(r => r.Submissions.Count);
            return Ok(result);
        }
        public IActionResult UnAuth()
        {
            RequestStatus requestStatus = new RequestStatus();
            requestStatus.makeUnAuthorized();
            return Ok(requestStatus);
        }
    }
}