import { RequestStatus } from "../../Security/Dtos/request-status";

export class ProgrammingLanguageViewModel extends RequestStatus {
  public LanguageId: number;
  public Name: string;
  public Description: string;
  public IsActive: boolean;
}
