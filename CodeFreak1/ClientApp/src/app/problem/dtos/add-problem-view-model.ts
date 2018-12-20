import { ProblemViewModel } from "./problem-view-model";
import { ProblemTestCaseViewModel } from "./problem-test-case-view-model";
import { EditorialViewModel } from "./editorial-view-model";

export class AddProblemViewModel {
  Problem: ProblemViewModel;
  TestFiles: Array<ProblemTestCaseViewModel>;
  Editorial: EditorialViewModel;

  constructor() {
    this.Editorial = new EditorialViewModel();
    this.Problem = new ProblemViewModel();
    this.TestFiles = new Array<ProblemTestCaseViewModel>();
  }
}
