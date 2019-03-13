import { MessageViewModel } from "./MessageViewModel";
import { UsersViewModel } from "../../Security/Dtos/users-view-model";
import { RequestStatus } from "../../request-status";

export class MessageCompleteViewModel{
  public message: MessageViewModel;
  public sender: UsersViewModel;
  public reciever: UsersViewModel;

  constructor() {
    this.message = new MessageViewModel();
    this.sender = new UsersViewModel();
    this.reciever = new UsersViewModel();
  }
}