import { RequestStatus } from "../../Security/Dtos/request-status";
import { MessageCompleteViewModel } from "./Message-complete-view-model";

export class MessageReturnViewModel extends RequestStatus
{
    public  Message_list: Array<MessageCompleteViewModel>;
    public  currentUserId: string;
    public MessageReturnViewModel()
    {
        this.Message_list = new Array<MessageCompleteViewModel>();
    }
}