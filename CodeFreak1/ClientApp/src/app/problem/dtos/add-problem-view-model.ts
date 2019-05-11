import { ProblemViewModel } from "./problem-view-model";
import { ProblemTestCaseViewModel } from "./problem-test-case-view-model";
import { EditorialViewModel } from "./editorial-view-model";
import { RequestStatus } from "../../Security/Dtos/request-status";


export class AddProblemViewModel extends RequestStatus {
  Problem: ProblemViewModel;
  TestFiles: Array<ProblemTestCaseViewModel>;
  Editorial: EditorialViewModel;

  constructor() {
    super();
    this.Editorial = new EditorialViewModel();
    this.Problem = new ProblemViewModel();
    this.TestFiles = new Array<ProblemTestCaseViewModel>();
  }
}
