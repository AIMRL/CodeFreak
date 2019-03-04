import { Injectable } from '@angular/core';
import { CodeFreakHeaders } from '../Interceptors/CodeFreakHeaders';
import { AppSettings } from '../AppSetting';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserRolesViewModel } from './Dtos/user-roles-view-model';
import { SignInViewModel } from './Dtos/sign-in-view-model';
<<<<<<< HEAD
import { RequestStatus } from '../request-status';
import { UsersViewModel } from './Dtos/users-view-model';

@Injectable()
export class SecurityService {
  private baseUrl: string = AppSettings.baseUrl;
  private handlerUrl: string = AppSettings.authURl;
  private getTokenUrl: string = `token/`;
  private signupUrl: string = `signup/`;
=======
import { FormGroup, FormControl } from '@angular/forms';
import { RequestStatus } from './Dtos/request-status';
import { ProfileEmailViewModel } from './Dtos/profile-email-view-model';
import { ProfileViewModel } from './Dtos/profile-view-model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class SecurityService {

  ProfileURl: string = AppSettings.ProfileURl;
  postImageURl: string = `UploadImage`;
  test: string = `Test`;

  baseUrl: string = AppSettings.baseUrl;
  handlerUrl: string = AppSettings.authURl;
  getTokenUrl: string = `token/`;
>>>>>>> develop
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

<<<<<<< HEAD
  signupUser(user: UsersViewModel): Observable<RequestStatus> {
    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
    let url = `${this.baseUrl}${this.handlerUrl}${this.signupUrl}`;
    var res = this.http.post<RequestStatus>(url, JSON.stringify(user), httpOptions).pipe(
      tap((cre: RequestStatus) => this.log(`added employee w/ Success=${cre.Success}`)),
      catchError(this.handleError<RequestStatus>('Error in login')));
    return res;
  }
=======
  postImage(fileToUpload: File) {
    

    let httpOptions = CodeFreakHeaders.GetSimpleHeader();

    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);

   // let url = `${this.baseUrl}${this.ProfileURl}${this.postImageURl}`;

   // let url = `${this.baseUrl}${this.ProfileURl}${this.test}`;
      let url1 = 'https://localhost:44312/api/Profile/UploadImage';

   // var test = { "name": "John" };

  //  var res = this.http.get(url1, data, httpOptions);


    this.http.post(url1,formData,httpOptions)
      .subscribe(data => { console.log(data); })



    //.pipe(
    // tap((cre: RequestStatus) => this.log(`added employee w/ Success=${cre.Success}`)),
    //  catchError(this.handleError<RequestStatus>('Error in login')));


  }

  sendCodeEmail(credentials: ProfileEmailViewModel): Observable<ProfileEmailViewModel> {

    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
    let url = 'https://localhost:44312/api/Profile/SendEmail';

    
    //var res = this.http.post<ProfileEmailViewModel>(url, JSON.stringify(credentials)).pipe(
    //  tap((cre: ProfileEmailViewModel) => this.log(`added employee w/ Success=${cre.Success}`)),
    //  catchError(this.handleError<ProfileEmailViewModel>('Error in login')));
    //return res;

    return this.http.post<ProfileEmailViewModel>(url, JSON.stringify(credentials), httpOptions);

  }


  changePassword(Password: String) {



    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);


    let url = 'https://localhost:44312/api/Profile/ChangePassword';

    this.http.post(url, JSON.stringify(Password), httpOptions).subscribe(data => { console.log(data); });
  }

  changePersonalInfo(cred: ProfileViewModel) {

    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };

    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = 'https://localhost:44312/api/Profile/ChangePersonalInfo';

   
    return this.http.post(url, JSON.stringify(cred), httpOptions).subscribe(data => { console.log(data); });

  }

>>>>>>> develop

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
