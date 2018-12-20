import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { TouchedSubmittedErrorStateMatcher } from '../../Angular Material/touched-submitted-error-state-matcher';
import { Router } from '@angular/router';
import { SecurityService } from '../security.service';
import { UsersViewModel } from '../Dtos/users-view-model';
import { SignInViewModel } from '../Dtos/sign-in-view-model';
import { UserRolesViewModel } from '../Dtos/user-roles-view-model';
import { AppSettings } from '../../AppSetting';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  imagePath = AppSettings.SignInPath;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new TouchedSubmittedErrorStateMatcher();
  userRoles: UserRolesViewModel;
  loginCredentials: SignInViewModel;
  hide = true;
  constructor(private router: Router, private service: SecurityService) { }

  ngOnInit() {

    localStorage.removeItem("token");
  this.loginCredentials = new SignInViewModel();
  this.userRoles = new UserRolesViewModel();
  }
  login() {
    debugger;
    this.service.loginUser(this.loginCredentials).subscribe(res => {
      debugger;
      if (res.Success) {
        this.userRoles = res;
        localStorage.setItem("token", this.userRoles.Token);
        this.router.navigate(['home']);
        return;
      }
    });
  }

}
