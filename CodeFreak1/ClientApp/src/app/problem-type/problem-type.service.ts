import { Injectable } from '@angular/core';
import { CodeFreakHeaders } from '../Interceptors/CodeFreakHeaders';
import { AppSettings } from '../AppSetting';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProblemTypeViewModel } from './dtos/problem-type-view-model';
import { ToastService } from '../toast/toast.service';
import { Router } from '@angular/router';



@Injectable()
export class ProblemTypeService{
  baseUrl: string = AppSettings.baseUrl;
  handlerUrl: string = AppSettings.problemTypeURl;
  getAllProblemTypesUrl: string = `allProblemTypes`;

  constructor(private http: HttpClient, private route: Router, private toast: ToastService) { }



  getAllProblemTypes(): Observable<Array<ProblemTypeViewModel>> {
    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
    let url = `${this.baseUrl}${this.handlerUrl}${this.getAllProblemTypesUrl}`;
    var res = this.http.get<Array<ProblemTypeViewModel>>(url, httpOptions).pipe(
      tap((cre: Array<ProblemTypeViewModel>) => this.log(`added employee w/ Success=${cre.length}`)),
      catchError((error: HttpErrorResponse) => this.handleError<Array<ProblemTypeViewModel>>(error))
    );
    return res;
  }




  private handleError<T>(error: HttpErrorResponse, result?: T) {
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
