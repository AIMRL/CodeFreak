import { Injectable } from '@angular/core';
import { CodeFreakHeaders } from '../Interceptors/CodeFreakHeaders';
import { AppSettings } from '../AppSetting';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DifficultyViewModel } from './dtos/difficulty-view-model';
import { ToastService } from '../toast/toast.service';
import { Router } from '@angular/router';

@Injectable()
export class DifficultyService {
  baseUrl: string = AppSettings.baseUrl;
  handlerUrl: string = AppSettings.difficultyURl;
  getAllDifficultiesUrl: string = `allDifficulty`;

  constructor(private http: HttpClient, private route: Router, private toast: ToastService) { }


  getAllDifficulties(): Observable<Array<DifficultyViewModel>> {
    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
    let url = `${this.baseUrl}${this.handlerUrl}${this.getAllDifficultiesUrl}`;
    var res = this.http.get<Array<DifficultyViewModel>>(url, httpOptions).pipe(
      tap((cre: Array<DifficultyViewModel>) => this.log(`added employee w/ Success=${cre.length}`)),
      catchError((error: HttpErrorResponse)=>this.handleError<Array<DifficultyViewModel>>(error)));
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
