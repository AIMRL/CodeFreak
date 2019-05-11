import { RequestStatus } from "../../Security/Dtos/request-status";

export class ProblemTestCaseViewModel extends RequestStatus {
  public ProblemTestCaseId: string;
  public ProblemId: string;
  public InputFilePath: string;
  public OutputFilePath: string;
  public SizeInputFile: number;
  public SizeOutputFile: number;
  public InputFile: File;
  public outFile: File;
}
