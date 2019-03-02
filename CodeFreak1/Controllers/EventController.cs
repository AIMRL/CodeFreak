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
        [Route("addEvent")]
        [HttpPost("addEvent")]
        public IActionResult addEvent(EventViewModel eventViewModel)
        {
            if(eventViewModel==null || eventViewModel.Name == null) {
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
            Event eve = eveRep.getEventById(id);
            if (eve == null)
            {
                RequestStatus requestStatus = new RequestStatus();
                requestStatus.ItemNotFound();
                return Ok(requestStatus);
            }
            EventUserViewModel eventUserViewModel = new EventUserViewModel();
            eventUserViewModel.Event= Mapper.Map<Event,EventViewModel>(eve);
            eventUserViewModel.User = Mapper.Map<Users, UsersViewModel>(eve.CreatedByNavigation);
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
            EventProblems eventProblem = Mapper.Map<EventProblemsViewModel,EventProblems>(eventProblemsViewModel);
            eventProblem.EventProblemId = Guid.NewGuid();
            EventProblems insertedEventProblems =eveRep.insertEventProblem(eventProblem);
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
            var list=eveRep.getProblemsByEventId(eventId);
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
                submission.Language= Mapper.Map<ProgrammingLanguage, ProgrammingLanguageViewModel>(item.Language);
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

    }
}