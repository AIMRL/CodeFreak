import { Component, OnInit } from '@angular/core';
import { EventViewModel } from '../dtos/event-view-model';
import { EventService } from '../event.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  p: number = 1;
  pp: number = 1;
  pendingEvents: Array<EventViewModel>;
  myEvents: Array<EventViewModel>;

  constructor(private eventService: EventService) {

  }
  ngOnInit() {
    this.myEvents = new Array<EventViewModel>();
    this.pendingEvents = new Array<EventViewModel>();

    this.eventService.getPendingEvents().subscribe(res => {
      if (res != null) {
        this.pendingEvents= res;
      }
    });
    this.eventService.getMyEvents().subscribe(res => {
      if (res != null) {
        this.myEvents = res;
      }
    });


  }

}
