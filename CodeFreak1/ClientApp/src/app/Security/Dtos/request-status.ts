export class RequestStatus {
  public Success: boolean;
  public Error: string;
  public StatusCode: number;
  constructor() {
    this.Success = false;
    this.Error = "";
    this.StatusCode = 0;
  }
}
