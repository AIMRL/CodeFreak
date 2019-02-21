export class RequestStatus {
  public Success: boolean;
  public Error: string;
  public StatusCode: number;
  public Message: string;
  constructor() {
    this.Success = false;
    this.Error = "";
    this.StatusCode = 0;
    this.Message = "";
  }
}
