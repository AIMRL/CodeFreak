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


@Injectable()
export class SecurityService {

  private baseUrl: string = AppSettings.baseUrl;
  private handlerUrl: string = AppSettings.authURl;
  private getTokenUrl: string = `token/`;
  private signupUrl: string = `signup/`;

  ProfileURl: string = AppSettings.ProfileURl;
  postImageURl: string = `UploadImage`;
  test: string = `Test`;

  private profileUrl: string = `/api/profile/`;
  private SubmissionUrl: string = `/api/Submission/`;
  private submissionListUrl: string = `ByUser?UserId=`;

  private imageProfileUrl: string = `UploadImage`;
  private emailUrl: string = `SendEmail`;

  private personalInfoUrl: string = `ChangePersonalInfo`;
  private passwordUrl: string = `ChangePassword`;
  private UserInfo: string = `User`;



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

  postImage(fileToUpload: File) {
    
    var headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);
    let httpOptions = {
      headers: headers
    };


    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);

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

    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };

    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.profileUrl}${this.UserInfo}`;


    var res = this.http.get<ProfileViewModel>(url, httpOptions);

    return res;


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


  getSubmission(cre: String): Observable<Array<ProblemSubmissionViewModel>> {

 

    let httpOptions = CodeFreakHeaders.GetSimpleHeader();

    let url = `${this.baseUrl}${this.SubmissionUrl}${this.submissionListUrl}${cre}`;

    var res = this.http.get<Array<ProblemSubmissionViewModel>>(url, httpOptions);


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
