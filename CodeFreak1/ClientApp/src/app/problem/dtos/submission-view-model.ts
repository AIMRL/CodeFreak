import { RequestStatus } from "../../Security/Dtos/request-status";
import { SubmissionProblemTestCaseViewModel } from "./submission-problem-testcase-view-model";

export class SubmissionViewModel extends RequestStatus {

  public SubmissionId: string;
  public UserId: string;
  public ProblemId: string;
  public Score: number;
  public Status: string;
  public SubmissionDateTime: string;
  public Code: string;

  public submissionProblemTestCase: Array<SubmissionProblemTestCaseViewModel>;
}
