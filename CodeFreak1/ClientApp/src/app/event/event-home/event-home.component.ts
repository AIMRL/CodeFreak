import { Component, OnInit, Input } from '@angular/core';
import { EventViewModel } from '../dtos/event-view-model';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { interval, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventUserViewModel } from '../dtos/event-user-view-model';
import { AppSettings } from '../../AppSetting';

@Component({
  selector: 'app-event-home',
  templateUrl: './event-home.component.html',
  styleUrls: ['./event-home.component.css']
})
export class EventHomeComponent implements OnInit {
  logoPath = AppSettings.logoPath;
  eventUser: EventUserViewModel;
//  event: EventViewModel;
  isEventFound = false;
  @Input() eventId: number;
  msg: string;
  startCountDown: number;
  endCountDown: number;
  isSCD = true;
  isESD = false;
  interval: Observable<number>;
  subcription: Subscription;
  days = 0; hours = 0; minutes = 0; seconds = 0;
  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    debugger;
    this.eventUser = new EventUserViewModel();
    //this.eventId = Number.parseInt(this.route.snapshot.paramMap.get('eventId'));
    if (this.eventId == null) {
      this.msg = "Event Id problem";
      return;
    }
    this.eventService.getEventById(this.eventId).toPromise().then(res => {
      debugger;
      if (res == null || !res.Success) {
        this.msg = "Event Not Found";
        return;
      }
      this.isEventFound = true;
      this.eventUser = res;
  //    this.event = res.Event;
      this.startCountDown = new Date(this.eventUser.Event.StartDateTime.valueOf()).valueOf() - Date.now();
      this.endCountDown = new Date(this.eventUser.Event.EndDateTime.valueOf()).valueOf() - Date.now();
      this.interval = interval(1000);
      this.subcription=this.interval.subscribe((x) => {
        if (this.startCountDown > 0) {
          this.isSCD = true;
          this.isESD = false;
          this.startCountDown = this.startCountDown - 1000;
          this.setCountDown(this.startCountDown);
        }
        else if (this.endCountDown > 0) {
          this.isESD = true;
          this.isSCD = false;
          this.endCountDown = this.endCountDown - 1000;
          this.setCountDown(this.endCountDown);
        } else {
          this.days = 0; this.hours = 0; this.minutes = 0; this.seconds = 0;
          this.isSCD = false;
          this.isESD = false;
          this.unsubscribeInterval(this.subcription);
        }
      });
    });
  }
  unsubscribeInterval(interval: Subscription) {
    interval.unsubscribe();
  }
  setCountDown(date) {
    var temp = date;
    this.days = Math.floor(temp / (1000 * 60 * 60 * 24));
    temp = temp - this.days * (1000 * 60 * 60 * 24);
    this.hours = Math.floor( temp / (1000 * 60 * 60));
    temp = temp - this.hours * (1000 * 60 * 60);
    this.minutes = Math.floor( temp / (1000 * 60));
    temp = temp - this.minutes * (1000 * 60);
    this.seconds = Math.floor(temp / (1000));
    temp = temp - this.seconds * (1000);
  }

}
