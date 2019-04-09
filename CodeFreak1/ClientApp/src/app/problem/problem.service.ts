import { Injectable } from '@angular/core';
import { AppSettings } from '../AppSetting';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { CodeFreakHeaders } from '../Interceptors/CodeFreakHeaders';
import { CodeViewModel } from './dtos/code-view-model';
import { CompilerResultViewModel } from './dtos/compiler-result-view-model';
import { ProblemCompleteViewModel } from './dtos/problem-complete-view-model';
import {ProblemUserCodeViewModel} from './dtos/Problem-user-code-view-model';
import { SubmissionViewModel } from './dtos/submission-view-model';
import {CompilerOutputViewModel} from './dtos/compiler-output-view-model';
import { UsersViewModel } from '../Security/Dtos/users-view-model';

import { forEach } from '@angular/router/src/utils/collection';
import { AddProblemViewModel } from './dtos/add-problem-view-model';
import { ProblemViewModel } from './dtos/problem-view-model';
import { debug } from 'util';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';


@Injectable()
export class ProblemService {


  storage: any;
  private baseUrl: string = AppSettings.baseUrl;
  private handlerUrl: string = AppSettings.compilerURl;
  private problemHandlerUrl: string = AppSettings.problemURl;
  private compileUrl: string = `compile/`;
  private allProblemsUrl: string = `allProblem/`;
  private problemByIdUrl: string = `problemById?id=`;  

  submissionUrl: string = AppSettings.submissionURl;
  UserSubmissionUrl: string = `byProblemId?ProblemId=`;
  UserSubmissionDetailUrl: string = `bySubId?sId=`;
  UserFileCodeUrl: string = `byUrlFile?urlFile=`;

  private addProblemUrl: string = `addProblem`;
  constructor(private http: HttpClient, private route: Router, private toast: ToastService) { }


  addProblem(problemData: AddProblemViewModel): Observable<ProblemViewModel> {
    debugger;
    var formData= new FormData();
    for (var i = 0; i < problemData.TestFiles.length; i = i + 1) {
      formData.append(problemData.TestFiles[i].InputFilePath, problemData.TestFiles[i].InputFile, problemData.TestFiles[i].InputFilePath);
      formData.append(problemData.TestFiles[i].OutputFilePath, problemData.TestFiles[i].outFile, problemData.TestFiles[i].OutputFilePath);
    }
    formData.append("problem", JSON.stringify(problemData.Problem));
    formData.append("editorial", JSON.stringify(problemData.Editorial));
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token')})
    };
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);
    let url = `${this.baseUrl}${this.problemHandlerUrl}${this.addProblemUrl}`;
    var res = this.http.post<ProblemViewModel>(url, formData, httpOptions).pipe(
      tap((cre: ProblemViewModel) => this.log(`added employee w/ Success=${cre.Success}`)),
      catchError((error: HttpErrorResponse) =>this.handleError<ProblemViewModel>(error)));
    return res;
  }
  handleError1(errorResponse: HttpErrorResponse) {
    debugger;
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }

    // return an observable with a meaningful error message to the end user
    //return throwError('There is a problem with the service.We are notified & 
     //working on it.Please try again later.');
  }
  compileCode(credentials: ProblemUserCodeViewModel): Observable<CompilerOutputViewModel> {


    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);




    let url = `${this.baseUrl}${this.handlerUrl}${this.compileUrl}`;
    var res = this.http.post<CompilerOutputViewModel>(url, JSON.stringify(credentials), httpOptions).pipe(
      tap((cre: CompilerOutputViewModel) => this.log(`added employee w/ Success=${cre.Success}`)),
      catchError((error: HttpErrorResponse) =>this.handleError<CompilerOutputViewModel>(error)));
    return res;
  }

  
  getAllProblems(): Observable<Array<ProblemCompleteViewModel>> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.problemHandlerUrl}${this.allProblemsUrl}`;
    var res = this.http.get<Array<ProblemCompleteViewModel>>(url, httpOptions).pipe(
      tap((cre: Array<ProblemCompleteViewModel>) => this.log(`added employee w/ Success=${cre.length}`)),
      catchError((error: HttpErrorResponse) => this.handleError<Array<ProblemCompleteViewModel>>(error))
    );
    return res;
  }


  getProblembyId(id): Observable<ProblemCompleteViewModel> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.problemHandlerUrl}${this.problemByIdUrl}${id}`;
    var res = this.http.get<ProblemCompleteViewModel>(url, httpOptions).pipe(
      tap((cre: ProblemCompleteViewModel) => this.log(`added employee w/ Success=${cre.Success}`)),
      catchError((error: HttpErrorResponse) =>this.handleError<ProblemCompleteViewModel>(error)));
    return res;
  }

  getSubmissionOfUser(ProblemId : string): Observable<Array<SubmissionViewModel>> {

    let httpOptions = CodeFreakHeaders.GetSimpleHeader();

    let url = `${this.baseUrl}${this.submissionUrl}${this.UserSubmissionUrl}${ProblemId}`;

    var res = this.http.get<Array<SubmissionViewModel>>(url, httpOptions).pipe(
      tap((cre: Array<SubmissionViewModel>) => this.log(`added employee w / Success=${cre.length}`)),
      catchError((error: HttpErrorResponse) =>this.handleError<Array<SubmissionViewModel>>(error))
    );

    return res;
  }


  getSubmissionDetail(sId: string): Observable<SubmissionViewModel> {

    let httpOptions = CodeFreakHeaders.GetSimpleHeader();

    let url = `${this.baseUrl}${this.submissionUrl}${this.UserSubmissionDetailUrl}${sId}`;

    var res = this.http.get<SubmissionViewModel>(url, httpOptions);

    return res;
  }

  getUrlDetail(urlFile: string): Observable<string> {

    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.handlerUrl}${this.UserFileCodeUrl}${urlFile}`;

    var res = this.http.get<string>(url, httpOptions);

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
