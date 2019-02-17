import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EventViewModel } from '../dtos/event-view-model';
import { ToastService } from '../../toast/toast.service';
import { AppSettings } from '../../AppSetting';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  logoPath = AppSettings.logoPath;
  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  event: EventViewModel;

  constructor(private toastService: ToastService, private eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.event = new EventViewModel();
//    this.event.Description="Provide some detail about event"
  }

  showAlertMessage(caption, message) {
    this.toastService.makeWarning(caption, message);
  }
  createEvent() {
    if (!this.validateDates(this.event)) {
      return;
    }

    this.eventService.addEvent(this.event).toPromise().then(res => {
      if (res == null) {
        this.toastService.makeError("Server Error", "Result not found");
        return;
      }
      if (!res.Success) {
        this.toastService.makeError("Error", res.Error);
        return;
      }
      this.event = res;
      this.toastService.makeSuccess("Event Created", res.Name + " created Successfully");
      this.router.navigate(['event-home', this.event.EventId]);
      return;
    })


  }
  validateDates(eve: EventViewModel): boolean {
    debugger;
    if (eve.ApplyingLastDate.valueOf() > eve.StartDateTime.valueOf()) {
      this.toastService.makeError("Dates Problem", "Applying last date should be less than Event Start Date Time");
      return false;
    }
    var a = eve.StartDateTime.valueOf();
    var b = eve.EndDateTime.valueOf();
    if (eve.StartDateTime.valueOf() > eve.EndDateTime.valueOf()) {
      this.toastService.makeError("Dates Problem", "Event Start Date Time should be small than Event End Date Time");
      return false;
    }
    return true;
  }



}
