

import { RequestStatus } from "./request-status";

export class ProfileViewModel extends RequestStatus {
  public Email: string;
  public Name: string;
  public Password: string;

  public imageURL: string;
  public UserId: string;
}
