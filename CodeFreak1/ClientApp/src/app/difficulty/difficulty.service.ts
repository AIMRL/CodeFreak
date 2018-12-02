import { Injectable } from '@angular/core';
import { CodeFreakHeaders } from '../Interceptors/CodeFreakHeaders';
import { AppSettings } from '../AppSetting';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from "rxjs/observable/of";
import { DifficultyViewModel } from './dtos/difficulty-view-model';

@Injectable()
export class DifficultyService {
  baseUrl: string = AppSettings.baseUrl;
  handlerUrl: string = AppSettings.difficultyURl;
  getAllDifficultiesUrl: string = `allDifficulty`;

  constructor(private http: HttpClient) { }


  getAllDifficulties(): Observable<Array<DifficultyViewModel>> {
    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
    let url = `${this.baseUrl}${this.handlerUrl}${this.getAllDifficultiesUrl}`;
    var res = this.http.get<Array<DifficultyViewModel>>(url, httpOptions).pipe(
      tap((cre: Array<DifficultyViewModel>) => this.log(`added employee w/ Success=${cre.length}`)),
      catchError(this.handleError<Array<DifficultyViewModel>>('Error in login')));
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
