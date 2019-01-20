import { RequestStatus } from "../../Security/Dtos/request-status";

export class ProblemUserCodeViewModel extends RequestStatus {
 
        public Code: string ;
        public problemId: string ; 
        public userId: string;
 
}
