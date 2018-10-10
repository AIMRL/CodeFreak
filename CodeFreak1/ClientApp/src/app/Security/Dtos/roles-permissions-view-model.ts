import { RequestStatus } from "./request-status";
import { RolesViewModel } from "./roles-view-model";
import { PermissionsViewModel } from "./permissions-view-model";

export class RolesPermissionsViewModel extends RequestStatus {
  public Role: RolesViewModel;
  public Permissions: Array<PermissionsViewModel>;
}
