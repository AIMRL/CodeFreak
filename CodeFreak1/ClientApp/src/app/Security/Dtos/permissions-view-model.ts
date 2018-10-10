import { RequestStatus } from "./request-status";

export class PermissionsViewModel extends RequestStatus {
  public PermissionId: number;
  public Name: string;
  public Description: string;
  public CreatedBy: number;
  public CreatedOn: Date;
  public Modifiedby: string;
  public ModifiedOn: Date;
  public IsActive: boolean;
}
