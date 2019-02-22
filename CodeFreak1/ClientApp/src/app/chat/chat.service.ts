import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {MessageViewModel} from './Dtos/MessageViewModel';

import { HubConnection , HubConnectionBuilder, LogLevel, HttpTransportType} from '@aspnet/signalr';
import { Hub } from './Dtos/HubModule';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hub: Hub;

  private msg: MessageViewModel;
  endpoint = 'https://localhost:44380/api/';
  constructor(private http: HttpClient) { }
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
  postMessage (message: MessageViewModel): Observable<HttpResponse<any>> {
    console.log(message);
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' })
    };
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Accept', 'application/json');
    httpOptions.headers.append('Authorization', `bearer ${localStorage.getItem('token')}`);

    const httpHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' });
    return this.http.post<any>(this.endpoint + 'Chat', message, {headers : httpHeaders , observe: 'response'});
  }
  private log(message: string) {
    //
  }
  sendSomeMessage(msg: MessageViewModel) {
    msg.recieverId = 'ED683A37-5571-4EB0-9AE1-48204E76D1B1';
    Hub._hubConnection.invoke('sendMessage', msg, localStorage.getItem('token'));
 }
}
