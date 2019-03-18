import { MessageCompleteViewModel } from "./Message-complete-view-model";
import { RequestStatus } from "../../request-status";

export class MessageReturnViewModel extends RequestStatus {
  public Message_list: Array<MessageCompleteViewModel>;
  public currentUserId: string;

  constructor() {
      super();
    this.Message_list = new Array<MessageCompleteViewModel>();
  }
}