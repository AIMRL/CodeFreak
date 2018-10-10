import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../AppSetting';
import { Validators, FormControl } from '@angular/forms';
import { TouchedSubmittedErrorStateMatcher } from '../../Angular Material/touched-submitted-error-state-matcher';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';
import { UsersViewModel } from '../Dtos/users-view-model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  //Signup page requirements
  imagePath = AppSettings.SignInPath;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  loginFormControl = new FormControl('', [
    Validators.required,
  ]);
  nameFormControl = new FormControl('', [
    Validators.required,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new TouchedSubmittedErrorStateMatcher();
  hide = true;

  //user object
  user: UsersViewModel;
  constructor(private router: Router, private service: SecurityService) { }

  ngOnInit() {
    this.user = new UsersViewModel();
  }

  signup() {
    debugger;
    this.user.Name = "aa";
  }

}
