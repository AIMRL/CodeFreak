import { ProblemViewModel } from "./problem-view-model";
import { ProblemTypeViewModel } from "../../problem-type/dtos/problem-type-view-model";
import { DifficultyViewModel } from "../../difficulty/dtos/difficulty-view-model";
import { RequestStatus } from "../../request-status";

export class ProblemCompleteViewModel extends RequestStatus {
  public Problem: ProblemViewModel;
  public ProblemType: ProblemTypeViewModel;
  public Difficulty: DifficultyViewModel;

  constructor() {
    super();
    this.Difficulty = new DifficultyViewModel();
    this.Problem = new ProblemViewModel();
    this.ProblemType = new ProblemTypeViewModel();
  }
}
