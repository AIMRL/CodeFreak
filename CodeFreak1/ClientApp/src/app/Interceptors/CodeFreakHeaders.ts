import { HttpHeaders } from "@angular/common/http";

export class CodeFreakHeaders {
  static GetSimpleHeader() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let httpOptions = {
      headers: headers
    };
    return httpOptions;
  }
  static GetBearerHeader() {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);
    let httpOption = {
      headers: headers
    };
    return httpOption;
  }
}
