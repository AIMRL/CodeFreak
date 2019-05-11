import { Injectable } from '@angular/core';
import { AppSettings } from '../AppSetting';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CodeFreakHeaders } from '../Interceptors/CodeFreakHeaders';
import { EventViewModel } from './dtos/event-view-model';
import { EventUserViewModel } from './dtos/event-user-view-model';
import { EventProblemsViewModel } from './dtos/event-problems-view-model';
import { ProblemCompleteViewModel } from '../problem/dtos/problem-complete-view-model';
import { CompleteSubmissionViewModel } from '../problem/dtos/complete-submission-view-model';
import { UserInfoViewModel } from '../Security/Dtos/user-info-view-model';
import { ToastService } from '../toast/toast.service';
import { Router } from '@angular/router';
import { RequestStatus } from '../Security/Dtos/request-status';
import { EventPerformanceViewModel } from './dtos/event-performance-view-model';
import { EventBoardComponent } from './event-board/event-board.component';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl: string = AppSettings.baseUrl;
  private handlerUrl: string = AppSettings.eventURl;
  private problemHandlerUrl: string = AppSettings.problemURl;
  private addEventUrl: string = `addEvent`;
  private getEventyIdUrl: string = `getEvent`;
  private addEventProblemUrl: string = `addEventProblem`;
  private getEventProblemsUrl: string = `getEventProblems`;
  private removeEventProblemsUrl: string = `deleteEventProblem`;
  private getEventSubmissionsUrl: string = `getEventSubmissions`;
  private addEventUserUrl:string=`addEventUser`;
  private getEventUsersUrl = `getEventUsers`;
  private removeEventUserUrl = `removeEventUser`;
  private getMyEventsUrl = `getMyEvents`;
  private getPendingEvenstUrl = `getPendingEvents`;
  private getEventWithCreatorUrl = `getEventCreator`;
  private applyForEventUrl = `applyForEvent`;
  private eventBoardResultUrl = `getBoardResult`;



  constructor(private http: HttpClient, private route: Router, private toast: ToastService) { }
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
      catchError((error: HttpErrorResponse)=>this.handleError<EventViewModel>(error)));
    return res;
  }
  getEventById(id): Observable<EventUserViewModel> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.handlerUrl}${this.getEventyIdUrl}?eventId=${id}`;
    var res = this.http.get<EventUserViewModel>(url, httpOptions).pipe(
      tap((cre: EventUserViewModel) => this.log(`added employee w/ Success=${cre.Success}`)),
      catchError((error: HttpErrorResponse) => this.handleError<EventUserViewModel>(error, id)));
    return res;
  }
  getEventCreatorById(id): Observable<EventUserViewModel> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.handlerUrl}${this.getEventWithCreatorUrl}?id=${id}`;
    var res = this.http.get<EventUserViewModel>(url, httpOptions).pipe(
      tap((cre: EventUserViewModel) => this.log(``)),
      catchError((error: HttpErrorResponse) => this.handleError<EventUserViewModel>(error)));
    return res;
  }

  getEventBoardResult(id): Observable<Array<EventPerformanceViewModel>> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.handlerUrl}${this.eventBoardResultUrl}?id=${id}`;
    var res = this.http.get<Array<EventPerformanceViewModel>>(url, httpOptions).pipe(
      tap((cre: Array<EventPerformanceViewModel>) => this.log(``)),
      catchError((error: HttpErrorResponse) => this.handleError<EventUserViewModel>(error)));
    return res;
  }

  getMyEvents(): Observable<Array<EventViewModel>> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.handlerUrl}${this.getMyEventsUrl}`;
    var res = this.http.get<Array<EventViewModel>>(url, httpOptions).pipe(
      tap((cre: Array<EventViewModel>) => this.log(``)),
      catchError((error: HttpErrorResponse) => this.handleError<EventUserViewModel>(error)));
    return res;
  }
  getPendingEvents(): Observable<Array<EventViewModel>> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.handlerUrl}${this.getPendingEvenstUrl}`;
    var res = this.http.get<Array<EventViewModel>>(url, httpOptions).pipe(
      tap((cre: Array<EventViewModel>) => this.log(``)),
      catchError((error: HttpErrorResponse) => this.handleError<EventUserViewModel>(error)));
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
      catchError((error: HttpErrorResponse) =>this.handleError<EventProblemsViewModel>(error)));
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
      catchError((error: HttpErrorResponse) =>this.handleError<EventProblemsViewModel>(error)));
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
      catchError((error: HttpErrorResponse) =>this.handleError<Array<ProblemCompleteViewModel>>(error)));
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
      catchError((error: HttpErrorResponse) =>this.handleError<Array<CompleteSubmissionViewModel>>(error)));
    return res;
  }

  addEventUser(val): Observable<EventUserViewModel> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.handlerUrl}${this.addEventUserUrl}`;
    var res = this.http.post<EventUserViewModel>(url, JSON.stringify(val), httpOptions).pipe(
      tap((cre: EventUserViewModel) => this.log(`added employee w/ Success=${cre.Success}`)),
      catchError((error: HttpErrorResponse) =>this.handleError<EventUserViewModel>(error)));
    return res;
  }

  applyForEvent(val): Observable<RequestStatus> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.handlerUrl}${this.applyForEventUrl}`;
    var res = this.http.post<RequestStatus>(url, JSON.stringify(val), httpOptions).pipe(
      tap((cre: RequestStatus) => this.log(``)),
      catchError((error: HttpErrorResponse) => this.handleError<EventUserViewModel>(error)));
    return res;
  }

  getEventUser(id): Observable<Array<EventUserViewModel>> {
    //    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.handlerUrl}${this.getEventUsersUrl}?eventId=${id}`;
    var res = this.http.get<Array<EventUserViewModel>>(url, httpOptions).pipe(
      tap((cre: Array<EventUserViewModel>) => this.log(`added employee w/ Success=${cre.length}`)),
      catchError((error: HttpErrorResponse) =>this.handleError<Array<EventUserViewModel>>(error)));
    return res;
  }

  removeEventUser(eveUser: EventUserViewModel): Observable<UserInfoViewModel> {
    //    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    let url = `${this.baseUrl}${this.handlerUrl}${this.removeEventUserUrl}`;
    var res = this.http.post<UserInfoViewModel>(url, JSON.stringify(eveUser), httpOptions).pipe(
      tap((cre: UserInfoViewModel) => this.log(`added employee w/ Success=`)),
      catchError((error: HttpErrorResponse) =>this.handleError<UserInfoViewModel>(error)));
    return res;
  }




  private handleError<T>(error: HttpErrorResponse, id?: number, result?: T) {
    debugger;
    if (error.status == 401) {
      this.toast.makeError("Please login", "");
      this.route.navigate(['/home']);
      return;
    }
    if (error.status == 408) {
      this.toast.makeError("Time out", "You can not perform this action now");
      return;
    }
    if (error.status == 404) {
      this.toast.makeError("Not Found", "");
      this.route.navigate(['/home']);
      return;
    }
    if (error.status == 412) {
      this.route.navigate(['/event-d',id]);
      return;
    }
    return Observable.throw(error);

  }
  private log(message: string) {
    //console.log(message);
  }

}
