
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from '../event/event.service';
import { isNullOrUndefined } from 'util';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class EventDetailGuard implements CanActivate {

  constructor(private router: Router, private eventService: EventService, private toastService: ToastService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    debugger;
    var id: number = Number.parseInt(next.paramMap.get('id'));
    var req = this.eventService.getEventById(id).toPromise();
    if (!isNullOrUndefined(req)) {
      req.then(res => {
        debugger;
        var isEventAdmin: boolean = false;
        var isEventUser: boolean = false;
        if (isNullOrUndefined(res) || !res.Success) {
          this.toastService.makeError("UnAuthorized", "You are not allowed");
          this.router.navigate(['home']);
          return;
        }
        res.Roles.forEach(item => {
          if (item.Name.toLowerCase() == "event creator" || item.Name.toLowerCase() == "event modifier" || item.Name.toLowerCase() == "event roles modifier") {
            isEventAdmin = true;

          }
          if (item.Name.toLowerCase() == "event user") {
            isEventUser = true;
          }
        });
        if (isEventAdmin) {
          this.router.navigate(['event-ad', id]);
          return;
        }
        if (isEventUser) {
          this.router.navigate(['event', id]);
          return;
        }
        var st = new Date(res.Event.StartDateTime);
        st.setMinutes(st.getMinutes() - st.getTimezoneOffset());
        res.Event.StartDateTime = new Date(st);
        if (res.Event.ApplyingLastDate > (new Date(Date.now()))) {
          return;
        }
        this.toastService.makeError("UnAuthorized", "You are not allowed");
        this.router.navigate(['home']);
        return true;
      });

    }
    else {
      this.toastService.makeError("UnAuthorized", "You are not allowed");
      this.router.navigate(['home']);
      return true;
    }
  }
}
