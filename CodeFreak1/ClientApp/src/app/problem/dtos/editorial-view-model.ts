import { RequestStatus } from "../../Security/Dtos/request-status";

export class EditorialViewModel extends RequestStatus {
  public EditorialId: string;
  public Description: string;
  public Code: string;
  public LanguageId: number;
  public ProblemId: string;
  public UserId: string;
  public InputFile: File;
  public outFile: File;
}
