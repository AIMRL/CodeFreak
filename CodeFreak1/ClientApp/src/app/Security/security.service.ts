import { Injectable } from '@angular/core';
import { CodeFreakHeaders } from '../Interceptors/CodeFreakHeaders';
import { AppSettings } from '../AppSetting';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserRolesViewModel } from './Dtos/user-roles-view-model';
import { SignInViewModel } from './Dtos/sign-in-view-model';
import { RequestStatus } from '../request-status';
import { UsersViewModel } from './Dtos/users-view-model';
import { FormGroup, FormControl } from '@angular/forms';
import { ProfileEmailViewModel } from './Dtos/profile-email-view-model';
import { ProfileViewModel } from './Dtos/profile-view-model';
import { ProblemSubmissionViewModel } from './Dtos/problem-submission-view-model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { UserInfoViewModel } from './Dtos/user-info-view-model';
import { RolesViewModel } from './Dtos/roles-view-model';
import { Router } from '@angular/router';
import { debug } from 'util';
import { ToastService } from '../toast/toast.service';


@Injectable()
export class SecurityService {
  private baseUrl: string = AppSettings.baseUrl;
  private handlerUrl: string = AppSettings.authURl;
  private roleUrl: string= AppSettings.roleURl;

  private getTokenUrl: string = `token/`;
  private signupUrl: string = `signup/`;
  private getAllUserInfoUrl= `getAllUserInfo`;
  private getEventRolesUrl = `getAllRoles`;
  ProfileURl: string = AppSettings.ProfileURl;
  postImageURl: string = `UploadImage`;
  test: string = `Test`;
  private profileUrl: string = `/api/Profile/`;
  private SubmissionUrl: string = `/api/Submission/`;
  private submissionListUrl: string = `ByUser?UserId=`;
  private imageProfileUrl: string = `UploadImage`;
  private emailUrl: string = `SendEmail`;
  private personalInfoUrl: string = `ChangePersonalInfo`;
  private passwordUrl: string = `ChangePassword`;
  private UserInfo: string = `User`;
  constructor(private http: HttpClient, private route: Router, private toast: ToastService) { }
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
      catchError((error: HttpErrorResponse)=>this.handleError<UserRolesViewModel>(error)));
    return res;
  }

  //Signup User

  signupUser(user: UsersViewModel): Observable<RequestStatus> {
    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
    let url = `${this.baseUrl}${this.handlerUrl}${this.signupUrl}`;
    var res = this.http.post<RequestStatus>(url, JSON.stringify(user), httpOptions).pipe(
      tap((cre: RequestStatus) => this.log(`added employee w/ Success=${cre.Success}`)),
      catchError((error: HttpErrorResponse) =>this.handleError<RequestStatus>(error)));
    return res;
  }

  postImage(fileToUpload: File) {
    debugger;
    var headers = new HttpHeaders();
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    };
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
      let url1 = 'https://localhost:44312/api/Profile/UploadImage';

    let url = `${this.baseUrl}${this.profileUrl}${this.imageProfileUrl}`;
    this.http.post(url,formData,httpOptions)
      .subscribe(data => { console.log(data); })

  }

  sendCodeEmail(credentials: ProfileEmailViewModel): Observable<ProfileEmailViewModel> {

    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
    let url = `${this.baseUrl}${this.profileUrl}${this.emailUrl}`;
   

    return this.http.post<ProfileEmailViewModel>(url, JSON.stringify(credentials), httpOptions);
  }


  gtetUserInfo(): Observable<ProfileViewModel> {
    debugger;
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };

    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.profileUrl}${this.UserInfo}`;


    var res = this.http.get<ProfileViewModel>(url, httpOptions).pipe(
      tap((cre: ProfileViewModel) => this.log(``)),
      catchError((err: HttpErrorResponse)=>this.catchEE<ProfileViewModel>(err))
    );

    return res;


  }
  private catchEE<T>(error) {
    debugger;
    console.log(error);
    return Observable.throw(error);
    //this.route.navigate(['login']);
    //return (error: any): Observable<T> => {
    //  // TODO: send the error to remote logging infrastructure
    //  console.error(error); // log to console instead
    //  // TODO: better job of transforming error for user consumption
    //  this.log(`${operation} failed: ${error.message}`);
    //  // Let the app keep running by returning an empty result.
    //  return of(result as T);
    //};
  }
  changePassword(Password: String) {



    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.profileUrl}${this.passwordUrl}`;

    this.http.post(url, JSON.stringify(Password), httpOptions).subscribe(data => { console.log(data); });
  }

  changePersonalInfo(cred: ProfileViewModel) {



    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };

    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.profileUrl}${this.personalInfoUrl}`;

   
    return this.http.post(url, JSON.stringify(cred), httpOptions).subscribe(data => { console.log(data); });

  }

  getUsersInfo(id):Observable<Array<UserInfoViewModel>>{    
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.handlerUrl}${this.getAllUserInfoUrl}?eventId=${id}`;
    var res = this.http.get<Array<UserInfoViewModel>>(url, httpOptions).pipe(
      tap((cre: Array<UserInfoViewModel>) => this.log(`added employee w/ Success`)),
      catchError((error: HttpErrorResponse) =>this.handleError<Array<UserInfoViewModel>>(error)));
    return res;

  }

  getEventRoles(): Observable<Array<RolesViewModel>> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.roleUrl}${this.getEventRolesUrl}`;
    var res = this.http.get<Array<RolesViewModel>>(url, httpOptions).pipe(
      tap((cre: Array<RolesViewModel>) => this.log(`added employee w/ Success`)),
      catchError((error: HttpErrorResponse) =>this.handleError<Array<RolesViewModel>>(error)));
    return res;

  }
 
  getSubmission(cre: String): Observable<Array<ProblemSubmissionViewModel>> {

 

    let httpOptions = CodeFreakHeaders.GetSimpleHeader();

    let url = `${this.baseUrl}${this.SubmissionUrl}${this.submissionListUrl}${cre}`;

    var res = this.http.get<Array<ProblemSubmissionViewModel>>(url, httpOptions);
    return res;

  }


  private handleError<T>(error: HttpErrorResponse, result?: T) {
    debugger;
    if (error.status == 401) {
      this.toast.makeError("Please login", "");
      this.route.navigate(['login']);
      return;
    }
    return Observable.throw(error);

  }
  private log(message: string) {
    console.log(message);
  }

}
