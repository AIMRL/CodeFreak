import { RequestStatus } from "../../Security/Dtos/request-status";
import { UsersViewModel } from "../../Security/Dtos/users-view-model";
import { EventViewModel } from "./event-view-model";
import { RolesViewModel } from "../../Security/Dtos/roles-view-model";
import { FileViewModel } from "../../Security/Dtos/file-view-model";

export class EventUserViewModel extends RequestStatus{
  public User: UsersViewModel;
  public Event: EventViewModel;
  public Roles: Array<RolesViewModel>;
  public UserImage: FileViewModel;
}
