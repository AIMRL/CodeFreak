import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecurityService } from '../../Security/security.service';


@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {

  name = "Arslan Aslam";
  email = "arslanaslam@gmail.com";

  imagePath = "../../assets/images/default-user.png";

  constructor(private securityService: SecurityService, private router: Router, private http: HttpClient) { }

  ngOnInit() {



    this.securityService.gtetUserInfo().subscribe( res =>
    {
      this.name = res.Name;
      this.email = res.Email;
      this.imagePath = res.imageURL;
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
