import { Injectable } from '@angular/core';
import { AppSettings } from '../AppSetting';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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


@Injectable()
export class ProblemService {


  storage: any;
  private baseUrl: string = AppSettings.baseUrl;
  private handlerUrl: string = AppSettings.compilerURl;
  private problemHandlerUrl: string = AppSettings.problemURl;
  private compileUrl: string = `compile/`;
  private allProblemsUrl: string = `allProblem/`;
  private problemByIdUrl: string = `problemById?id=`;

  private submissionUrl: string = AppSettings.submissionURl;
  private UserSubmissionUrl: string = `byProblemId?ProblemId=`;
  private addProblemUrl: string = `addProblem`;
  constructor(private http: HttpClient) { }

  addProblem(problemData: AddProblemViewModel): Observable<ProblemViewModel> {
    debugger;

    var formData = new FormData();
    for (var i = 0; i < problemData.TestFiles.length;i=i+1) {
      formData.append(problemData.TestFiles[i].InputFilePath, problemData.TestFiles[i].InputFile);
      formData.append(problemData.TestFiles[i].OutputFilePath, problemData.TestFiles[i].outFile);
    }
    formData.append("problem", JSON.stringify(problemData.Problem));
    formData.append("editorial", JSON.stringify(problemData.Editorial));

    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.handlerUrl}${this.addProblemUrl}`;

    var res = this.http.post<ProblemViewModel>(url, formData, httpOptions).pipe(
      tap((cre: ProblemViewModel) => this.log(`added employee w/ Success=${cre.Success}`)),
      catchError(this.handleError<ProblemViewModel>('Error in login')));
    return res;
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
      catchError(this.handleError<CompilerOutputViewModel>('Error in login')));
    return res;
  }

  
  getAllProblems(): Observable<Array<ProblemCompleteViewModel>> {
//    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.problemHandlerUrl}${this.allProblemsUrl}`;
    var res = this.http.get<Array<ProblemCompleteViewModel>>(url, httpOptions).pipe(
      tap((cre: Array<ProblemCompleteViewModel>) => this.log(`added employee w/ Success=${cre.length}`)),
      catchError(this.handleError<Array<ProblemCompleteViewModel>>('Error in login')));
    return res;
  }


  getProblembyId(id): Observable<ProblemCompleteViewModel> {
//    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.problemHandlerUrl}${this.problemByIdUrl}${id}`;
    var res = this.http.get<ProblemCompleteViewModel>(url, httpOptions).pipe(
      tap((cre: ProblemCompleteViewModel) => this.log(`added employee w/ Success=${cre.Success}`)),
      catchError(this.handleError<ProblemCompleteViewModel>('Error in login',res)));
    return res;
  }

  getSubmissionOfUser(ProblemId : string): Observable<Array<SubmissionViewModel>> {

    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.submissionUrl}${this.UserSubmissionUrl}${ProblemId}`;

    var res = this.http.get<Array<SubmissionViewModel>>(url, httpOptions).pipe(
      tap((cre: Array<SubmissionViewModel>) => this.log(`added employee w / Success=${cre.length}`)),
      catchError(this.handleError<Array<SubmissionViewModel>>('Error in get Submission'))
    );

    return res;
  }


  private handleError<T>(operation = 'operation', result?: T) {
    debugger;
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
