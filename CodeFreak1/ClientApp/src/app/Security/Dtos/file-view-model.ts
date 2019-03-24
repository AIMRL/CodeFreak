import { RequestStatus } from "./request-status";

export class FileViewModel extends RequestStatus {
  public FileId: string;
  public UserId: string;
  public FilePath: string;
  public Size: number;
  public Extention: string;
}