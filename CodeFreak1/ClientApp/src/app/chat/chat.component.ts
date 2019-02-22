import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HubConnection , HubConnectionBuilder, LogLevel, HttpTransportType} from '@aspnet/signalr';
import {ChatService} from './chat.service';
import {MessageViewModel} from './Dtos/MessageViewModel';
import { HttpHeaders } from '@angular/common/http';
import { Hub } from './Dtos/HubModule';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private hub: Hub;
  private _hubConnection: HubConnection;
  private msg: MessageViewModel;


  constructor(private chatService: ChatService) {
  }
  ngOnInit() {
    /*this._hubConnection = new HubConnectionBuilder()
    .withUrl('https://localhost:44380/chathub').build();
    this._hubConnection
      .start()
      .then(() => this._hubConnection.invoke('validate', localStorage.getItem('token')))
      .catch(err => console.log('Error while establishing connection :('));
      this._hubConnection.on('recieveMessage', (message: MessageViewModel) => {
        console.log('in recieve');
        console.log(message);
      });*/

    if (Hub._hubConnection == null) {
      this.hub = new Hub();
      this.hub.buildConnection().then(function() {
      });
      Hub._hubConnection.on('recieveMessage', (message) => {
        console.log('in recieve');
        console.log(message);
      });
    } else {
      Hub._hubConnection.on('recieveMessage', (message) => {
        console.log('in recieve');
        console.log(message);
      });

    }
  }

  sendmessage(messageForm: NgForm) {
   this.msg = new MessageViewModel();
  this.msg = messageForm.value;
  this.chatService.sendSomeMessage(this.msg);
}
}
