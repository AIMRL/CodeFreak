import { MessageCompleteViewModel } from "src/app/Security/profile/Dtos/Message-complete-view-model";
import { RequestStatus } from "src/app/request-status";

export class MessageReturnViewModel extends RequestStatus
{
    public  Message_list: Array<MessageCompleteViewModel>;
    public  currentUserId: string;
    public MessageReturnViewModel()
    {
        this.Message_list = new Array<MessageCompleteViewModel>();
    }

}