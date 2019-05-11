import { RequestStatus } from "../../Security/Dtos/request-status";

export class ProblemViewModel extends RequestStatus
{
  public ProblemId: string;
  public AuthorId: string;
  public ProblemTypeId: number;
  public DifficultyId: number;
  public Description: string;
  public MaxScore: number;
  public NoOfSubmission: number;
  public PostDateTime: Date;
  public NoOfTestCaseFiles: number;
  public Title: string;
  public IsPublic: boolean;
}
