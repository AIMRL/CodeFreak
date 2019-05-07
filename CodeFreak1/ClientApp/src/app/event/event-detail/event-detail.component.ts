
import { Component, OnInit, Input } from '@angular/core';
import { EventViewModel } from '../dtos/event-view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { interval, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventUserViewModel } from '../dtos/event-user-view-model';
import { AppSettings } from '../../AppSetting';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  logoPath = AppSettings.logoPath;
  profilesUrl = AppSettings.UserImagesBaseUrl;
  eventUser: EventUserViewModel;
  //  event: EventViewModel;
  isEventFound = false;
  eventId: number;
  msg: string;
  startCountDown: number;
  endCountDown: number;
  isSCD = true;
  isESD = false;
  interval: Observable<number>;
  subcription: Subscription;
  days = 0; hours = 0; minutes = 0; seconds = 0;
  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router, private toastService: ToastService) { }

  ngOnInit() {
    this.eventUser = new EventUserViewModel();
    this.eventId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    if (this.eventId == null) {
      this.msg = "Event Id problem";
      return;
    }
    this.eventService.getEventCreatorById(this.eventId).toPromise().then(res => {

      if (res == null || !res.Success) {
        this.msg = "Event Not Found";
        this.toastService.makeError("No Event found", "");
        this.router.navigate(['/home']);
        return;
      }

      var st = new Date(res.Event.StartDateTime);
      st.setMinutes(st.getMinutes() - st.getTimezoneOffset());
      res.Event.StartDateTime = new Date(st);

      var en = new Date(res.Event.EndDateTime);
      en.setMinutes(en.getMinutes() - en.getTimezoneOffset());
      res.Event.EndDateTime = new Date(en);
      
      this.isEventFound = true;
      this.eventUser = res;
      //    this.event = res.Event;
      this.startCountDown = new Date(this.eventUser.Event.ApplyingLastDate.valueOf()).valueOf() - Date.now();
      this.interval = interval(1000);
      this.subcription = this.interval.subscribe((x) => {
        if (this.startCountDown > 0) {
          this.isSCD = true;
          this.isESD = false;
          this.startCountDown = this.startCountDown - 1000;
          this.setCountDown(this.startCountDown);
        } else {
          this.days = 0; this.hours = 0; this.minutes = 0; this.seconds = 0;
          this.isSCD = false;
          this.isESD = false;
          this.unsubscribeInterval(this.subcription);
          this.router.navigate(['/home']);
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
    this.hours = Math.floor(temp / (1000 * 60 * 60));
    temp = temp - this.hours * (1000 * 60 * 60);
    this.minutes = Math.floor(temp / (1000 * 60));
    temp = temp - this.minutes * (1000 * 60);
    this.seconds = Math.floor(temp / (1000));
    temp = temp - this.seconds * (1000);
  }
  applyNow() {
    var eventUser: EventUserViewModel = new EventUserViewModel();
    eventUser.Event = new EventViewModel();
    eventUser.Event.EventId = this.eventId;

    this.eventService.applyForEvent(eventUser).subscribe(res => {
      if (res == null) {
        this.toastService.makeError("Server error", "Server Error");
        return;
      }
      if (!res.Success) {
        this.toastService.makeError(res.Message, "User is not added");
        return;
      }
      this.toastService.makeSuccess("You have joined Event Successfully","");
      this.router.navigate(['event-m', this.eventId]);
      return;
    });
  }
}
