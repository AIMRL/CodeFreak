import { RequestStatus } from "../../request-status";

export class EventViewModel extends RequestStatus {
 public EventId: number ;
 public Name: string ;
 public Description: string ;
 public StartDateTime: Date ;
 public EndDateTime: Date ;
 public ApplyingLastDate: Date ;
 public CreatedOn: Date ;
 public CreatedBy: string;
 public IsActive: boolean ;
}
