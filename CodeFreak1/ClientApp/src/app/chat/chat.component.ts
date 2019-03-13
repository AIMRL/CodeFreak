import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HubConnection , HubConnectionBuilder, LogLevel, HttpTransportType} from '@aspnet/signalr';
import {ChatService} from './chat.service';
import {MessageViewModel} from './Dtos/MessageViewModel';
import { HttpHeaders } from '@angular/common/http';
import { Hub } from './Dtos/HubModule';
import { MessageCompleteViewModel } from './Dtos/Message-complete-view-model';
import { MessageReturnViewModel } from './Dtos/Message-return-model';
import { UsersViewModel } from '../Security/Dtos/users-view-model';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: Array<MessageCompleteViewModel> = new Array<MessageCompleteViewModel>();
  users: Array<UsersViewModel> = new Array<UsersViewModel>();
  private hub: Hub;
  private _hubConnection: HubConnection;
  private msg: MessageViewModel;
  private curr_user: string;
  private index: any;
  private messageText: string;
  private reciever_id: string ;

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
      this.chatService.getAllUsers().subscribe(res => {
        this.index = 0;
        this.getChat(res[0], 0);
        this.users = res;
      });

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

  sendmessage() {
    this.msg = new MessageViewModel();
    this.msg.MessageText = this.messageText;
    this.msg.recieverId = this.reciever_id;
    this.messageText = '';
    this.chatService.sendSomeMessage(this.msg);
    this.getChat(this.users[this.index], this.index);

}
getChat(user: UsersViewModel, index: any) {
  this.index = index;
  this.reciever_id = user.UserId;
  this.chatService.getCurrentUserMessagesWith(user.UserId).subscribe(res => {
    this.messages = res.Message_list;
    this.curr_user = res.currentUserId;
    console.log(this.messages.length);
  });

}
}
