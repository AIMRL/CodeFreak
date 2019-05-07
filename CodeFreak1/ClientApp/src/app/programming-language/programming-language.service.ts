import { Injectable } from '@angular/core';
import { CodeFreakHeaders } from '../Interceptors/CodeFreakHeaders';
import { AppSettings } from '../AppSetting';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProgrammingLanguageViewModel } from './dtos/programming-language-view-model';
import { ToastService } from '../toast/toast.service';
import { Router } from '@angular/router';

@Injectable()
export class ProgrammingLanguageService {

  baseUrl: string = AppSettings.baseUrl;
  handlerUrl: string = AppSettings.programmingLanguageURl;
  getAllLanguagesUrl: string = `allLanguage`;

  constructor(private http: HttpClient, private route: Router, private toast: ToastService) { }


  getAllLanguages(): Observable<Array<ProgrammingLanguageViewModel>> {
    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
    let url = `${this.baseUrl}${this.handlerUrl}${this.getAllLanguagesUrl}`;
    var res = this.http.get<Array<ProgrammingLanguageViewModel>>(url, httpOptions).pipe(
      tap((cre: Array<ProgrammingLanguageViewModel>) => this.log(`getting Languaeges w/ Success=${cre.length}`)),
      catchError((error: HttpErrorResponse) => this.handleError<Array<ProgrammingLanguageViewModel>>(error)));
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
//    console.log(message);
  }
}
