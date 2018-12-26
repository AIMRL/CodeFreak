import { Injectable } from '@angular/core';
import { AppSettings } from '../AppSetting';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CodeFreakHeaders } from '../Interceptors/CodeFreakHeaders';
import { Observable ,  of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CodeViewModel } from './dtos/code-view-model';
import { CompilerResultViewModel } from './dtos/compiler-result-view-model';
import { ProblemCompleteViewModel } from './dtos/problem-complete-view-model';

@Injectable()
export class ProblemService {

  baseUrl: string = AppSettings.baseUrl;
  handlerUrl: string = AppSettings.compilerURl;
  problemHandlerUrl: string = AppSettings.problemURl;
  compileUrl: string = `compile/`;
  allProblemsUrl: string = `allProblem/`;
  problemByIdUrl: string = `problemById?id=`;

  constructor(private http: HttpClient) { }
  compileCode(credentials: CodeViewModel): Observable<CompilerResultViewModel> {
    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
    let url = `${this.baseUrl}${this.handlerUrl}${this.compileUrl}`;
    var res = this.http.post<CompilerResultViewModel>(url, JSON.stringify(credentials), httpOptions).pipe(
      tap((cre: CompilerResultViewModel) => this.log(`added employee w/ Success=${cre.Success}`)),
      catchError(this.handleError<CompilerResultViewModel>('Error in login')));
    return res;
  }
  getAllProblems(): Observable<Array<ProblemCompleteViewModel>> {
    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
    let url = `${this.baseUrl}${this.problemHandlerUrl}${this.allProblemsUrl}`;
    var res = this.http.get<Array<ProblemCompleteViewModel>>(url, httpOptions).pipe(
      tap((cre: Array<ProblemCompleteViewModel>) => this.log(`added employee w/ Success=${cre.length}`)),
      catchError(this.handleError<Array<ProblemCompleteViewModel>>('Error in login')));
    return res;
  }


  getProblembyId(id): Observable<ProblemCompleteViewModel> {
    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
    let url = `${this.baseUrl}${this.problemHandlerUrl}${this.problemByIdUrl}${id}`;
    var res = this.http.get<ProblemCompleteViewModel>(url, httpOptions).pipe(
      tap((cre: ProblemCompleteViewModel) => this.log(`added employee w/ Success=${cre.Success}`)),
      catchError(this.handleError<ProblemCompleteViewModel>('Error in login')));
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
