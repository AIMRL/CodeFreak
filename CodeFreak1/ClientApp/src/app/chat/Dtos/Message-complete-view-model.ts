import { MessageViewModel } from "./MessageViewModel";
import { UsersViewModel } from "src/app/Security/Dtos/users-view-model";

export class MessageCompleteViewModel
    {
        public  message: MessageViewModel;
        public  sender: UsersViewModel;
        public reciever: UsersViewModel;
        public currentUserId: string;

    }