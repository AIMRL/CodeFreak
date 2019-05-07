import { Component, OnInit, Input } from '@angular/core';
import { ProblemCompleteViewModel } from '../../problem/dtos/problem-complete-view-model';
import { ProblemService } from '../../problem/problem.service';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ProblemViewModel } from '../../problem/dtos/problem-view-model';
import { ToastService } from '../../toast/toast.service';
import { EventProblemsViewModel } from '../dtos/event-problems-view-model';
import { EventUserViewModel } from '../dtos/event-user-view-model';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'event-problems',
  templateUrl: './event-problems.component.html',
  styleUrls: ['./event-problems.component.css']
})
export class EventProblemsComponent implements OnInit {
  @Input() eventId :number;
  isNew=false;
  dialogueClass="modal-dialog";

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  
  problems: Array<ProblemCompleteViewModel>;
  allProblems: Array<ProblemCompleteViewModel>;
  problemIdToAdd:string;
  problemToBeRemoved:ProblemViewModel;
  event: EventUserViewModel;
  isEventClosed = true;
  constructor(private eventService: EventService, private route: ActivatedRoute,private problemService:ProblemService,private toastService: ToastService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.problems = new Array<ProblemCompleteViewModel>();
    this.allProblems = new Array<ProblemCompleteViewModel>();
//geeting event and current user
    var req = this.eventService.getEventById(this.eventId).toPromise();
    req.then(res => {
      if (!isNullOrUndefined(res)) {
        this.event = res;
        var st = new Date(res.Event.StartDateTime);
        st.setMinutes(st.getMinutes() - st.getTimezoneOffset());
        res.Event.StartDateTime = new Date(st);

        var en = new Date(res.Event.EndDateTime);
        en.setMinutes(en.getMinutes() - en.getTimezoneOffset());
        res.Event.EndDateTime = new Date(en);
        if ((new Date(res.Event.EndDateTime.valueOf()).valueOf()) > Date.now()) { this.isEventClosed = false; }
      }
    });


    //this.eventId=1;
    this.problemService.getAllProblems().subscribe(res => {
      this.allProblems = res;
    });

    this.eventService.getEventProblems(this.eventId).subscribe(res => {
      this.problems = res;
    });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  showExistProblme(){
    this.isNew=false;
  }
  showNewProblme(){
    this.isNew=true;  
  }
  addExistingProlem(){
    if(this.problemIdToAdd==null ||  this.problemIdToAdd==""){
      this.toastService.makeWarning("Problem Name is required","");
      return;
    }
    var prob=this.allProblems.find(p=>p.Problem.Title==this.problemIdToAdd);
    var eventProblem = new EventProblemsViewModel();
    eventProblem.EventId = this.eventId;
    eventProblem.ProblemId = prob.Problem.ProblemId;
    this.eventService.addEventProblem(eventProblem).subscribe(eveProbResult => {

      if (eveProbResult == null ) {
        this.showAlertMessage("Try Again", "Add Problem from existing Problem");
        return;
      }else if(!eveProbResult.Success && eveProbResult.StatusCode==10){
        this.showAlertMessage(eventProblem.Message,"Add another problem");
      }
      else{
        this.problems.push(prob);
        this.toastService.makeSuccess("Problem Added successfully","");
        return;
      }
    });
  }
  addedProblem(prob:ProblemViewModel){
    this.problemService.getProblembyId(prob.ProblemId).toPromise().then(res=>{

      if(res!=null){
        this.allProblems.push(res);
        this.problems.push(res);
        this.toastService.makeSuccess("Problem is added in event","");
      }

    })
  }
  removeProblem(){
    if(this.problemToBeRemoved==null){
      this.toastService.makeWarning("Select a problem to remove","");
      return;
    }
    var eventProblem=new EventProblemsViewModel();
    eventProblem.EventId=this.eventId;
    eventProblem.ProblemId=this.problemToBeRemoved.ProblemId;
    this.eventService.removeEventProblem(eventProblem).toPromise().then(res=>{
      if(res==null){
        this.toastService.makeError("Action Failed","Problem not removed");
        return;
      }
      if(!res.Success){
        this.toastService.makeError("Action Failed",res.Message);
        return;
      }
      this.toastService.makeSuccess("Action Successful",res.Message);
      this.problemToBeRemoved=null;
      var index=this.problems.findIndex(p=>p.Problem.ProblemId==res.ProblemId);
      if(index>-1){
        this.problems.splice(index,1);
      }
    });
  }
  assignRemoveProblem(prob:ProblemViewModel){
    this.problemToBeRemoved=prob;
  }
  showAlertMessage(caption, message) {
    this.toastService.makeWarning(caption, message);
  }

  modelClass(cl) {
 //   $('.modal-backdrop').remove();
    this.dialogueClass="modal-dialog "+cl+" animated";
  }

}
