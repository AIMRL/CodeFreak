import { UsersViewModel } from "../../Security/Dtos/users-view-model";
import { FileViewModel } from "../../Security/Dtos/file-view-model";
import { SubmissionViewModel } from "../../problem/dtos/submission-view-model";
import { RequestStatus } from "../../Security/Dtos/request-status";

export class EventPerformanceViewModel extends RequestStatus {
  public User: UsersViewModel;
  public UserImage: FileViewModel;
  public Submissions: Array<SubmissionViewModel>;
  public NoOfSubmissions: number;
  public TotalScore: number;
  public Position: number;
}
