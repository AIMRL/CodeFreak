import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
  constructor(private http: HttpClient) {
  }
  private extractData(res: Response) {
    const body = res;
    return body || { };
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 /* postMessage (message: MessageViewModel): Observable<HttpResponse<any>> {
    console.log(message);
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    const httpHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' });
    return this.http.post<any>(this.endpoint + 'Chat', message, {headers : httpHeaders , observe: 'response'});
  }*/

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
        catchError(this.handleError<MessageReturnViewModel>('Error in login')));

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
            catchError(this.handleError<Array<UsersReturnViewModel>>('Error in login')));
          return res;
        }
  private log(message: string) {
    //
  }
}
