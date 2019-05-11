import { SubmissionViewModel } from "./submission-view-model";
import { UsersViewModel } from "../../Security/Dtos/users-view-model";
import { ProblemViewModel } from "./problem-view-model";
import { ProgrammingLanguageViewModel } from "../../programming-language/dtos/programming-language-view-model";
import { RequestStatus } from "../../Security/Dtos/request-status";
import { FileViewModel } from "../../Security/Dtos/file-view-model";

export class CompleteSubmissionViewModel extends RequestStatus {
  public Submission: SubmissionViewModel;
  public User: UsersViewModel;
  public Problem: ProblemViewModel;
  public Language: ProgrammingLanguageViewModel;
  public UserImage: FileViewModel;
}
