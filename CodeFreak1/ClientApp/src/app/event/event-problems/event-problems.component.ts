import { Component, OnInit, Input } from '@angular/core';
import { ProblemCompleteViewModel } from '../../problem/dtos/problem-complete-view-model';
import { ProblemService } from '../../problem/problem.service';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-problems',
  templateUrl: './event-problems.component.html',
  styleUrls: ['./event-problems.component.css']
})
export class EventProblemsComponent implements OnInit {
  @Input() eventId: number;

  problems: Array<ProblemCompleteViewModel>;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    debugger;
    this.problems = new Array<ProblemCompleteViewModel>();


    this.eventService.getEventProblems(this.eventId).subscribe(res => {
      debugger;
      this.problems = res;
    });
  }
}
