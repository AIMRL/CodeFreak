import { RequestStatus } from "../../Security/Dtos/request-status";

export class SubmissionViewModel extends RequestStatus {

  public SubmissionId: string;
  public UserId: string;
  public ProblemId: string;
  public Score: number;
  public Status: string;
  public SubmissionDateTime: string;

}
