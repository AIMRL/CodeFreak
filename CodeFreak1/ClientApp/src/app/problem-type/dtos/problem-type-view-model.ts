import { RequestStatus } from "../../request-status";

export class ProblemTypeViewModel extends RequestStatus{
  public ProblemTypeId: number;
  public Name: string;
  public Description: string;
  public IsActive: boolean;
}
