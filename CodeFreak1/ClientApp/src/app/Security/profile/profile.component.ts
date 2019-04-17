import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../AppSetting';
import { SecurityService } from '../security.service';
import { ProfileEmailViewModel } from '../Dtos/profile-email-view-model';
import { ProfileViewModel } from '../Dtos/profile-view-model';
import { ProblemSubmissionViewModel } from '../Dtos/problem-submission-view-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})





export class ProfileComponent implements OnInit {


  // Edit Security Information

  profileViewModel: ProfileViewModel;
  profileEmailViewModel: ProfileEmailViewModel;
  submissionList: Array<ProblemSubmissionViewModel>;

  send_code_email ="";
  send_user_code = "";
  user_code_msg = "";

  codeUser = false;
  verifyUser = false;
  user_code_mismatch = false;
  ChangePassword = false;

  pass1 = "";
  pass2 = "";

  mismatchPassword = false;
  EditPassword = true;


  togglePasswordChild() {

    this.verifyUser = true;
    this.EditPassword = false;
    this.codeUser = false;
    this.user_code_mismatch = false;
    this.ChangePassword = false;

  }

  sendEmail() {

    this.codeUser = true;


    this.verifyUser = false;
    this.user_code_mismatch = false;
    this.ChangePassword = false;


    this.profileEmailViewModel = new ProfileEmailViewModel();

    this.profileEmailViewModel.Email=this.send_code_email;

    this.service.sendCodeEmail(this.profileEmailViewModel).subscribe(data => this.profileEmailViewModel = data);


  }
  matchCode() {

    this.verifyUser = false;
    this.user_code_mismatch = false;
    this.ChangePassword = false;
 

    if (this.send_user_code == this.profileEmailViewModel.Code) {
      this.ChangePassword = true;
      this.codeUser = false;
    
    }

    else {

        this.user_code_mismatch = true;
    }


  }

 
  ChangePasswordBackend() {

    if (this.pass1 == this.pass2) {
      this.mismatchPassword = false;
      this.verifyUser = false;
      this.ChangePassword = false;
      this.EditPassword = true;

      this.service.changePassword(this.pass1);
    }
    else {

      this.mismatchPassword = true;
    }
  }





  editPersonalInformat() {

    if (this.editPersonal == "Edit") {
      this.editPersonal = "Save";
      this.personal_name_readonly = false;
      this.personal_email_readonly = false;

    }
    else {
      this.editPersonal = "Edit";
      this.personal_name_readonly = true;
      this.personal_email_readonly = true;


      this.profileViewModel = new ProfileViewModel();

      this.profileViewModel.Name = this.personal_name;
      this.profileViewModel.Email = this.personal_email; 

      this.service.changePersonalInfo(this.profileViewModel);


    }

  }
  submissionlist = [
    { link: 'superman-link', name: 'Superman' },
    { link: 'batman-link', name: 'Batman' },
    { link: 'batgirl-link', name: 'BatGirl' },
    { link: 'robin-link', name: 'Robin' },
    { link: 'flash-link', name: 'Flash' }
  ];

  imageURL = AppSettings.logoPath;
  fileToUpload: File = null;


  editPersonal = "Edit";
  codefreak_rank: number;
  competition_won: number;
  problem_solved: number;

  personal_name: string;
  personal_email: string;

  personal_name_readonly: boolean;
  personal_email_readonly: boolean;


  constructor(private service: SecurityService ) {



    this.submissionList = new Array<ProblemSubmissionViewModel>();

    this.service.gtetUserInfo().subscribe(res => {


      this.profileViewModel = res;

      this.personal_name = this.profileViewModel.Name;
      this.personal_email = this.profileViewModel.Email;
      this.imageURL = AppSettings.UserImagesBaseUrl + this.profileViewModel.imageURL;

      this.service.getSubmission(this.profileViewModel.UserId).subscribe(

        or => {
          this.submissionList = or;
          this.problem_solved = or.length;
        })

  

    })


    this.personal_name_readonly = true;
    this.personal_email_readonly = true;

    this.codefreak_rank = 7;
    this.competition_won = 2;
 
  }

  ngOnInit() {

  }





  onFileChanged(event) {
    this.fileToUpload = event.target.files[0];

    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.imageURL = event.target.result;
    }

    reader.readAsDataURL(this.fileToUpload);

  }

  onUpload() {



   this.service.postImage(this.fileToUpload);

  }

}

