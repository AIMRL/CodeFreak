import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecurityService } from '../../Security/security.service';
import { debug } from 'util';
import { AppSettings } from '../../AppSetting';


@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {
  isAuth = false;
  userImagesBaseUrl = AppSettings.UserImagesBaseUrl;
  name = "CodeFreak";
  email = "CodeFreak";

  imagePath = AppSettings.logoPath;

  constructor(private securityService: SecurityService, private router: Router, private http: HttpClient) { }

  ngOnInit() {



   var s= this.securityService.gtetUserInfo().subscribe( res =>
   {
     if (res == null) {
       return;
     }
     this.isAuth = true;
      this.name = res.Name;
     this.email = res.Email;
     if (res.imageURL != null && res.imageURL != "") {
       this.imagePath = AppSettings.UserImagesBaseUrl + res.imageURL;
     }

      });
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(['login']);
  }

  profile() {
    this.router.navigate(['profile']);
  }
}
