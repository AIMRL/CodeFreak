import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../AppSetting';
import { Validators, FormControl } from '@angular/forms';
import { TouchedSubmittedErrorStateMatcher } from '../../Angular Material/touched-submitted-error-state-matcher';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';
import { UsersViewModel } from '../Dtos/users-view-model';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  //Signup page requirements
  imagePath = AppSettings.SignInPath;
 // logoPath = AppSettings.logoPath;

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
  constructor(private router: Router, private service: SecurityService, private toastService: ToastService) { }

  ngOnInit() {
    this.user = new UsersViewModel();
  }

  signup() {
    debugger;
    if (!this.validate()) {
      return;
    }
    this.service.signupUser(this.user).subscribe(res => {
      debugger;
      if (res == null) {
        this.toastService.makeError('Error', 'app does not hit api ');
        return;
      }
      if (!res.Success) {
        this.toastService.makeError('Error occur', res.Error);
        return;
      }
      if (res.Success) {
        this.toastService.makeSuccess(res.Message,'Please Do Login Now');
      }
      return this.router.navigate(['login']);
    })
  }

  validate():boolean {
    let flag = true;
    if (this.user.Login == null || this.user.Login== "") {
      this.toastService.makeWarning('Invalid Login ID', 'Please Insert Correct Login Id');
      flag= false;
    }
    if (this.user.Name == null || this.user.Name== "") {
      this.toastService.makeWarning('Invalid Name', 'Please Insert Correct Name');
      flag = false;
    }
    if (this.user.DateOfBirth == null) {
      this.toastService.makeWarning('Invalid Date of birth', 'Please Insert Correct Date of birth');
      flag = false;
    }
    if (this.user.Email == null || this.user.Email== "") {
      this.toastService.makeWarning('Invalid Email', 'Please Insert Correct Email');
      flag = false;
    }
    if (this.user.Password== null || this.user.Password== "") {
      this.toastService.makeWarning('Invalid Password', 'Please Insert Correct format of Password');
      flag = false;
    }
    return flag;
  }

}
