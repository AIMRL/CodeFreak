import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { TouchedSubmittedErrorStateMatcher } from '../../Angular Material/touched-submitted-error-state-matcher';
import { Router } from '@angular/router';
import { SecurityService } from '../security.service';
import { UsersViewModel } from '../Dtos/users-view-model';
import { SignInViewModel } from '../Dtos/sign-in-view-model';
import { UserRolesViewModel } from '../Dtos/user-roles-view-model';
import { AppSettings } from '../../AppSetting';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  imagePath = AppSettings.SignInPath;
  logoPath = AppSettings.logoPath;
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
  constructor(private router: Router, private service: SecurityService, private toaster: ToastService) { }

  ngOnInit() {

    localStorage.removeItem("token");
  this.loginCredentials = new SignInViewModel();
  this.userRoles = new UserRolesViewModel();
  }
  login() {
    debugger;
    this.toaster.clearToasts();
    this.service.loginUser(this.loginCredentials).subscribe(res => {
      debugger;
      if (res == null) {
        this.toaster.makeError('Error', 'server error');
        return;
      }
      if (res.Success) {
        this.userRoles = res;
        localStorage.setItem("token", this.userRoles.Token);
        this.toaster.makeSuccess('Login Successfully', 'Welcome ' + this.userRoles.User.Name);
        this.router.navigate(['home']);
        return;
      }
      else {
        this.toaster.makeError('Login Failed', res.Error);
      }
    });
  }

}
