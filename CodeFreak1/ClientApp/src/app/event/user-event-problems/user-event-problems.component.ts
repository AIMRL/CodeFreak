import { Component, OnInit, Input } from '@angular/core';
import { ProblemCompleteViewModel } from '../../problem/dtos/problem-complete-view-model';
import { EventService } from '../event.service';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'user-event-problems',
  templateUrl: './user-event-problems.component.html',
  styleUrls: ['./user-event-problems.component.css']
})
export class UserEventProblemsComponent implements OnInit {
  @Input() eventId:number;
  problems: Array<ProblemCompleteViewModel>;


  constructor(private eventService: EventService, private toastService: ToastService) { }

  ngOnInit() {
    debugger;
    this.eventService.getEventProblems(this.eventId).subscribe(res => {
      debugger;
      this.problems = res;
    });

  }

}
