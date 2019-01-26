import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private loadingBar: LoadingBarService, private router: Router) {}
  ngOnInit() {
      //this.router.navigate(['home']);

  }
  startLoading() {
    this.loadingBar.start();
  }
  
  stopLoading() {
    this.loadingBar.complete();
  }
}
