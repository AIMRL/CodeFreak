import { SubmissionProblemTestCaseViewModel } from "./submission-problem-testcase-view-model";

export class SubmissionViewModel {

  public SubmissionId: string;
  public UserId: string;
  public ProblemId: string;
  public Score: number;
  public Status: string;
  public SubmissionDateTime: string;
  public Code: string;

  public submissionProblemTestCase: Array<SubmissionProblemTestCaseViewModel>;
}
