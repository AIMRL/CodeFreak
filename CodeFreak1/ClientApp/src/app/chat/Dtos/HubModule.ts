
import { HubConnection , HubConnectionBuilder, LogLevel, HttpTransportType} from '@aspnet/signalr';
import { AppSettings } from '../../AppSetting';

export class Hub {
  static _hubConnection: HubConnection;
  public async buildConnection() {
    Hub._hubConnection = new HubConnectionBuilder()
      .withUrl(AppSettings.baseUrl+'/chatHub').build();
    await Hub._hubConnection
      .start()
      .then(() => Hub._hubConnection.invoke('validate', localStorage.getItem('token')))
      .catch(err => console.log('Error while establishing connection :('));
  }

}
