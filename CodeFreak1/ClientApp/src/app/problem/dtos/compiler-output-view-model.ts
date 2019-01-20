import { RequestStatus } from "../../Security/Dtos/request-status";
import { SubmissionProblemTestCaseViewModel } from "../dtos/submission-problem-testcase-view-model";

export class CompilerOutputViewModel extends RequestStatus {
  public TestcasesResult: Array<SubmissionProblemTestCaseViewModel>;

}
