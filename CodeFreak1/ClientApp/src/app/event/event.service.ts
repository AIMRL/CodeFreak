import { Injectable } from '@angular/core';
import { AppSettings } from '../AppSetting';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CodeFreakHeaders } from '../Interceptors/CodeFreakHeaders';
import { EventViewModel } from './dtos/event-view-model';
import { EventUserViewModel } from './dtos/event-user-view-model';
import { EventProblemsViewModel } from './dtos/event-problems-view-model';
import { ProblemCompleteViewModel } from '../problem/dtos/problem-complete-view-model';
import { CompleteSubmissionViewModel } from '../problem/dtos/complete-submission-view-model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  baseUrl: string = AppSettings.baseUrl;
  handlerUrl: string = AppSettings.eventURl;
  problemHandlerUrl: string = AppSettings.problemURl;
  addEventUrl: string = `addEvent`;
  getEventyIdUrl: string = `getEvent`;
  addEventProblemUrl: string = `addEventProblem`;
  getEventProblemsUrl: string = `getEventProblems`;
  removeEventProblemsUrl: string = `deleteEventProblem`;
  getEventSubmissionsUrl: string = `getEventSubmissions`;

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


  addEventProblem(eveProb): Observable<EventProblemsViewModel> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.handlerUrl}${this.addEventProblemUrl}`;
    var res = this.http.post<EventProblemsViewModel>(url, JSON.stringify(eveProb), httpOptions).pipe(
      tap((cre: EventProblemsViewModel) => this.log(`added employee w/ Success=${cre.Success}`)),
      catchError(this.handleError<EventProblemsViewModel>('Error in adding Event', res)));
    return res;
  }
  removeEventProblem(eveProb): Observable<EventProblemsViewModel> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.handlerUrl}${this.removeEventProblemsUrl}`;
    var res = this.http.post<EventProblemsViewModel>(url, JSON.stringify(eveProb), httpOptions).pipe(
      tap((cre: EventProblemsViewModel) => this.log(`added employee w/ Success=${cre.Success}`)),
      catchError(this.handleError<EventProblemsViewModel>('Error in adding Event', res)));
    return res;
  }

  getEventProblems(id): Observable<Array<ProblemCompleteViewModel>> {
    //    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.handlerUrl}${this.getEventProblemsUrl}?eventId=${id}`;
    var res = this.http.get<Array<ProblemCompleteViewModel>>(url, httpOptions).pipe(
      tap((cre: Array<ProblemCompleteViewModel>) => this.log(`added employee w/ Success=${cre.length}`)),
      catchError(this.handleError<Array<ProblemCompleteViewModel>>('Error in login')));
    return res;
  }
  getEventSubmissions(id): Observable<Array<CompleteSubmissionViewModel>> {
    //    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.handlerUrl}${this.getEventSubmissionsUrl}?eventId=${id}`;
    var res = this.http.get<Array<CompleteSubmissionViewModel>>(url, httpOptions).pipe(
      tap((cre: Array<CompleteSubmissionViewModel>) => this.log(`added employee w/ Success=${cre.length}`)),
      catchError(this.handleError<Array<CompleteSubmissionViewModel>>('Error in login')));
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
