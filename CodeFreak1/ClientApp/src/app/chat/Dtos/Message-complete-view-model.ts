import { MessageViewModel } from "./MessageViewModel";
import { UsersViewModel } from "../../Security/Dtos/users-view-model";

export class MessageCompleteViewModel
    {
        public  message: MessageViewModel;
        public  sender: UsersViewModel;
        public reciever: UsersViewModel;
        public currentUserId: string;

        constructor() {
            this.message = new MessageViewModel();
            this.sender = new UsersViewModel();
            this.reciever = new UsersViewModel();
          }

    }