import { RequestStatus } from "./request-status";
import { UsersViewModel } from "./users-view-model";
import { RolesPermissionsViewModel } from "./roles-permissions-view-model";

export class UserRolesViewModel extends RequestStatus {
  public User: UsersViewModel;
  public RolePermissions: Array<RolesPermissionsViewModel>;
  public Token: string;
}
