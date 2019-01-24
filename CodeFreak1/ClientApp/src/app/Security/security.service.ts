import { Injectable } from '@angular/core';
import { CodeFreakHeaders } from '../Interceptors/CodeFreakHeaders';
import { AppSettings } from '../AppSetting';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserRolesViewModel } from './Dtos/user-roles-view-model';
import { SignInViewModel } from './Dtos/sign-in-view-model';
import { RequestStatus } from '../request-status';
import { UsersViewModel } from './Dtos/users-view-model';

@Injectable()
export class SecurityService {
  private baseUrl: string = AppSettings.baseUrl;
  private handlerUrl: string = AppSettings.authURl;
  private getTokenUrl: string = `token/`;
  private signupUrl: string = `signup/`;
  constructor(private http: HttpClient) { }
  loginUser(credentials: SignInViewModel): Observable<UserRolesViewModel> {
    let httpOptions = CodeFreakHeaders.GetSimpleHeader();

    //let headers: HttpHeaders = new HttpHeaders();
    //headers = headers.append('Content-Type', 'application/json');
    //headers.append('Accept', 'application/json');
    //let httpOptions = {
    //  headers: headers
    //};
    let url = `${this.baseUrl}${this.handlerUrl}${this.getTokenUrl}`;
    var res = this.http.post<UserRolesViewModel>(url, JSON.stringify(credentials), httpOptions).pipe(
      tap((cre: UserRolesViewModel) => this.log(`added employee w/ Success=${cre.Success}`)),
      catchError(this.handleError<UserRolesViewModel>('Error in login')));
    return res;
  }

  //Signup User

  signupUser(user: UsersViewModel): Observable<RequestStatus> {
    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
    let url = `${this.baseUrl}${this.handlerUrl}${this.signupUrl}`;
    var res = this.http.post<RequestStatus>(url, JSON.stringify(user), httpOptions).pipe(
      tap((cre: RequestStatus) => this.log(`added employee w/ Success=${cre.Success}`)),
      catchError(this.handleError<RequestStatus>('Error in login')));
    return res;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    //
  }

}
