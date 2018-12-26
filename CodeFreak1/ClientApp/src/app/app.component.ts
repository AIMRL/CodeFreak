import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private loadingBar: LoadingBarService) {}

  startLoading() {
    this.loadingBar.start();
  }
  
  stopLoading() {
    this.loadingBar.complete();
  }
}
