import { Injectable } from '@angular/core';
import { CodeFreakHeaders } from '../Interceptors/CodeFreakHeaders';
import { AppSettings } from '../AppSetting';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProgrammingLanguageViewModel } from './dtos/programming-language-view-model';

@Injectable()
export class ProgrammingLanguageService {

  baseUrl: string = AppSettings.baseUrl;
  handlerUrl: string = AppSettings.programmingLanguageURl;
  getAllLanguagesUrl: string = `allLanguage`;

  constructor(private http: HttpClient) { }


  getAllLanguages(): Observable<Array<ProgrammingLanguageViewModel>> {
    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
    let url = `${this.baseUrl}${this.handlerUrl}${this.getAllLanguagesUrl}`;
    var res = this.http.get<Array<ProgrammingLanguageViewModel>>(url, httpOptions).pipe(
      tap((cre: Array<ProgrammingLanguageViewModel>) => this.log(`getting Languaeges w/ Success=${cre.length}`)),
      catchError(this.handleError<Array<ProgrammingLanguageViewModel>>('Error in getting languages')));
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
