import { RequestStatus } from "../../Security/Dtos/request-status";
import { UsersViewModel } from "../../Security/Dtos/users-view-model";
import { EventViewModel } from "./event-view-model";

export class EventUserViewModel extends RequestStatus{
  public User: UsersViewModel;
  public Event: EventViewModel;
}
