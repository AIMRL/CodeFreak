import { RequestStatus } from "./request-status";

export class UsersViewModel extends RequestStatus {
  public UserId: string;
  public Login: string;
  public Password: string;
  public Name: string;
  public Email: string;
  public CreatedOn: Date;
  public ModifiedOn: Date;
  public IsActive: boolean;
  public CreatedBy: string;
  public ModifieBy: string;
  public DateOfBirth: Date;
}
