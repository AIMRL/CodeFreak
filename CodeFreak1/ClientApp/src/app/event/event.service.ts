import { Injectable } from '@angular/core';
import { AppSettings } from '../AppSetting';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CodeFreakHeaders } from '../Interceptors/CodeFreakHeaders';
import { EventViewModel } from './dtos/event-view-model';
import { EventUserViewModel } from './dtos/event-user-view-model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  baseUrl: string = AppSettings.baseUrl;
  handlerUrl: string = AppSettings.eventURl;
  addEventUrl: string = `addEvent`;
  getEventyIdUrl: string = `getEvent`;

  constructor(private http: HttpClient) { }
  addEvent(eve): Observable<EventViewModel> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.handlerUrl}${this.addEventUrl}`;
    var res = this.http.post<EventViewModel>(url, JSON.stringify(eve), httpOptions).pipe(
      tap((cre: EventViewModel) => this.log(`added employee w/ Success=${cre.Success}`)),
      catchError(this.handleError<EventViewModel>('Error in adding Event', res)));
    return res;
  }
  getEventById(id): Observable<EventUserViewModel> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.handlerUrl}${this.getEventyIdUrl}?id=${id}`;
    var res = this.http.get<EventUserViewModel>(url, httpOptions).pipe(
      tap((cre: EventUserViewModel) => this.log(`added employee w/ Success=${cre.Success}`)),
      catchError(this.handleError<EventUserViewModel>('Error in adding Event', res)));
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
