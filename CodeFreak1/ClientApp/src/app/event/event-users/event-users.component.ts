import { Component, OnInit } from '@angular/core';
import { UserInfoViewModel } from '../../Security/Dtos/user-info-view-model';
import { SecurityService } from '../../Security/security.service';
import { AppSettings } from '../../AppSetting';
import { EventService } from '../event.service';
import { RolesViewModel } from '../../Security/Dtos/roles-view-model';
import { FormControl } from '@angular/forms';
import { EventUserViewModel } from '../dtos/event-user-view-model';
import { ToastService } from '../../toast/toast.service';
import { UsersViewModel } from '../../Security/Dtos/users-view-model';
import { EventViewModel } from '../dtos/event-view-model';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-event-users',
  templateUrl: './event-users.component.html',
  styleUrls: ['./event-users.component.css']
})
export class EventUsersComponent implements OnInit {

  eventId = 1;

  logoUrl: string = AppSettings.logoPath;
  userImageBaseUrl: string = AppSettings.UserImagesBaseUrl;
  dialogueClass = "modal-dialog";
  selectedRoles: Array<number>;

  userToBeRomoved: UsersViewModel;
  selectedUser: string;
  roleFromControl: FormControl;
  myControl: FormControl;
  users: Array<UserInfoViewModel>;
  eventUsers: Array<EventUserViewModel>;
  origEventUsers: Array<EventUserViewModel>;
  eventRoles: Array<RolesViewModel>;
  userIdToAdd: string;
  constructor(private securityService: SecurityService, private eventService: EventService, private toastService: ToastService) { }

  ngOnInit() {
    this.myControl = new FormControl();
    this.roleFromControl = new FormControl();
    this.selectedRoles = new Array<number>();
    this.eventUsers = new Array<EventUserViewModel>();
    this.origEventUsers = new Array<EventUserViewModel>();
    this.users = new Array<UserInfoViewModel>();
    this.securityService.getUsersInfo(this.eventId).toPromise().then(res => {
      debugger;
      if(res==null || res==undefined)
      {
        return;
      }
      this.users=res;
    });
    this.securityService.getEventRoles().toPromise().then(res => {
      debugger;
      if (res == null || res == undefined) {
        return;
      }
      this.eventRoles = res;
    });
    this.eventService.getEventUser(this.eventId).toPromise().then(res => {
      debugger;
      if (res == null) {
        return;
      }
      this.eventUsers = res;
      this.origEventUsers = res;
    });

  }
  modelClass(cl) {
    this.dialogueClass = "modal-dialog " + cl + " animated";
  }
  addUser() {
    debugger;
    if (this.selectedRoles.length < 1) {
      this.toastService.makeWarning("Roles are not selected", "Please select a role");
      return;
    }
    if (isNullOrUndefined(this.userIdToAdd) || this.userIdToAdd == "") {
      this.toastService.makeWarning("User is not selected", "Please select a User");
      return;
    }



    var eventUser: EventUserViewModel = new EventUserViewModel();
    eventUser.User = new UsersViewModel();
    eventUser.Roles = new Array<RolesViewModel>();
    eventUser.Event = new EventViewModel();
    eventUser.User.UserId = this.userIdToAdd;
    eventUser.Event.EventId = this.eventId;
    this.selectedRoles.forEach(r => {
      var item: RolesViewModel = new RolesViewModel();
      item.RoleId = r;
      eventUser.Roles.push(item);
    });
    this.eventService.addEventUser(eventUser).subscribe(res => {
      debugger;
      if (res == null) {
        this.toastService.makeError("Server error", "Server Error");
        return;
      }
      if (!res.Success) {
        this.toastService.makeError(res.Message, "User is not added");
        return;
      }
      this.eventUsers.push(res);
      var isExistInOrignal = this.origEventUsers.findIndex(e => e.User.UserId == res.User.UserId);
      if (isExistInOrignal == -1) { this.origEventUsers.push(res); }

      this.toastService.makeSuccess("User is added successfully", "");
      var index = this.users.findIndex(u => u.User.UserId == eventUser.User.UserId);
      this.users.splice(index, 1);
      this.selectedRoles = null;
      this.selectedUser = null;
      this.userIdToAdd = null;

    });
  }
  selectState(val: UserInfoViewModel) {
    debugger;
    if (val) {
      this.userIdToAdd = val.User.UserId;
      this.selectedUser = val.User.Name;
    }
  }
  assignRemoveUser(user: UsersViewModel) {
    this.userToBeRomoved = user;
  }
  removeUser() {
    if (isNullOrUndefined(this.userToBeRomoved)) {
      this.toastService.makeWarning("User is not selected", "User should be selected");
      return;
    }
    this.eventService.removeEventUser(this.userToBeRomoved.UserId, this.eventId).subscribe(res => {
      if (isNullOrUndefined(res)) { this.toastService.makeError("User is not romoved", ""); return; }
      if (!res.Success) { this.toastService.makeError(res.Message, ""); return; }
      var index = this.eventUsers.findIndex(e => e.User.UserId == res.User.UserId);
      if (index > -1) {
        this.eventUsers.splice(index, 1);
        this.toastService.makeSuccess("User is removed successfully", "");
        this.users.push(res);
        this.userToBeRomoved = null;
      }
    });

  }
}
