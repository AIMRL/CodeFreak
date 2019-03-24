import { RequestStatus } from "../../Security/Dtos/request-status";

export class UsersReturnViewModel extends RequestStatus {
  public UserId: string;
  public Name: string;
  public Email: string;
  public IsActive: boolean;
}
