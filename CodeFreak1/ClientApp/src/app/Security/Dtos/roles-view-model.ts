import { RequestStatus } from "./request-status";

export class RolesViewModel extends RequestStatus {
  public RoleId: number;
  public Name: string;
  public Description: string;
  public CreatedOn: Date;
  public ModifiedOn: Date;
  public IsActive: boolean;
  public ModifiedBy: string;
  public CreatedBy: string;
}
