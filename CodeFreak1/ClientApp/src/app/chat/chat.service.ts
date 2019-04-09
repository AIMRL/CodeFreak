import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppSettings } from '../AppSetting';
import { catchError, tap } from 'rxjs/operators';
import {MessageViewModel} from './Dtos/MessageViewModel';
import {MessageCompleteViewModel} from './Dtos/Message-complete-view-model';

import { HubConnection , HubConnectionBuilder, LogLevel, HttpTransportType} from '@aspnet/signalr';
import { Hub } from './Dtos/HubModule';
import { MessageReturnViewModel } from './Dtos/Message-return-model';
import { UsersViewModel } from '../Security/Dtos/users-view-model';
import { UsersReturnViewModel } from './Dtos/User-return-view-model';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hub: Hub;
  baseUrl: string = AppSettings.baseUrl;
  chatURL: string = AppSettings.chatURL;
  authURL: string = AppSettings.authURl;

  allUsersURL: string= 'allUsers/';
  allMessagesURL:string = 'allMessages/?userId=';



  private msg: MessageViewModel;
  endpoint = 'https://localhost:44380/api/Chat/';
  constructor(private http: HttpClient, private route: Router, private toast: ToastService) { }

  private extractData(res: Response) {
    const body = res;
    return body || { };
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


   async sendSomeMessage(msg: MessageViewModel) {
    await Hub._hubConnection.invoke('sendMessage', msg, localStorage.getItem('token'));
 }
 getCurrentUserMessagesWith(id): Observable<MessageReturnViewModel> {
  //    let httpOptions = CodeFreakHeaders.GetSimpleHeader();



      const httpOptions = {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
      };
      httpOptions.headers.append('Content-Type', 'application/json');
      httpOptions.headers.append('Accept', 'application/json');
      httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);
       const url = `${this.baseUrl}${this.chatURL}${this.allMessagesURL}${id}`;
       const res = this.http.get<MessageReturnViewModel>(url, httpOptions).pipe(
         tap((cre: MessageReturnViewModel) => this.log(`added employee w/ Success=${cre.Message_list.length}`)),
         catchError((error: HttpErrorResponse)=>this.handleError<MessageReturnViewModel>(error)));

      return res;
    }

    getAllUsers(): Observable<Array<UsersReturnViewModel>> {
      //    let httpOptions = CodeFreakHeaders.GetSimpleHeader();
          const httpOptions = {
            headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
          };
          httpOptions.headers.append('Content-Type', 'application/json');
          httpOptions.headers.append('Accept', 'application/json');
          httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);
           const url = `${this.baseUrl}${this.authURL}${this.allUsersURL}`;
           const res = this.http.get<Array<UsersReturnViewModel>>(url, httpOptions).pipe(
             tap((cre: Array<UsersReturnViewModel>) => this.log(`added employee w/ Success=${cre.length}`)),
             catchError((error: HttpErrorResponse)=>this.handleError<Array<UsersReturnViewModel>>(error)));
          return res;
        }
}
