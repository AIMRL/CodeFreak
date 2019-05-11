import { RequestStatus } from "./request-status";
import { UsersViewModel } from "./users-view-model";
import { FileViewModel } from "./file-view-model";

export class UserInfoViewModel extends RequestStatus {
  public User: UsersViewModel;
  public File: FileViewModel;
}
