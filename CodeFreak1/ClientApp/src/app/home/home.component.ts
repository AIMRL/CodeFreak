import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  isAdmin = false;
  isLogin = true;
  ngOnInit(): void {
    this.checkLogin();
  }
  checkLogin() {

    var token = localStorage.getItem("token");
    if (token != null) {
      this.isLogin = true;
    }
  }

}
