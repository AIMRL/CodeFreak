import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityService } from './security.service';
import { SignInViewModel } from './Dtos/sign-in-view-model';
import { PermissionsViewModel } from './Dtos/permissions-view-model';
import { RequestStatus } from './Dtos/request-status';
import { RolesPermissionsViewModel } from './Dtos/roles-permissions-view-model';
import { RolesViewModel } from './Dtos/roles-view-model';
import { UserRolesViewModel } from './Dtos/user-roles-view-model';
import { UsersViewModel } from './Dtos/users-view-model';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeFreakMaterialModuleModule } from '../Angular Material/code-freak-material-module/code-freak-material-module.module';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CodeFreakMaterialModuleModule,
    RouterModule.forRoot([
      { path: 'signup', component: SignupComponent },
      { path: 'profile', component: ProfileComponent }

    ])

  ],
  declarations: [SignupComponent, ProfileComponent],
  providers: [SignInViewModel, SecurityService, PermissionsViewModel, RequestStatus, RolesPermissionsViewModel, RolesViewModel, UserRolesViewModel, UsersViewModel]
})
export class SecurityModule { }
