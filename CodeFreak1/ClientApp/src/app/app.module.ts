import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TouchedSubmittedErrorStateMatcher } from './Angular Material/touched-submitted-error-state-matcher';
import { LoginComponent } from './Security/login/login.component';
import { CodeFreakMaterialModuleModule } from './Angular Material/code-freak-material-module/code-freak-material-module.module';
import { AdminHomeComponent } from './admin-components/admin-home/admin-home.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { AppheaderComponent } from './layouts/appheader/appheader.component';
import { AppfooterComponent } from './layouts/appfooter/appfooter.component';
import { AppmenuComponent } from './layouts/appmenu/appmenu.component';
import { AppsettingComponent } from './layouts/appsetting/appsetting.component';
import { AdminRoleGuard } from './Gaurds/admin-role.guard';
import { SecurityModule } from './Security/security.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ProblemTypeModule } from './problem-type/problem-type.module';
import { ProblemModule } from './problem/problem.module';
import { DifficultyModule } from './difficulty/difficulty.module';
import { ProgrammingLanguageModule } from './programming-language/programming-language.module';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { ToastrModule } from 'ngx-toastr';
import { ToastModule } from './toast/toast.module';
import { EventModule } from './event/event.module';
import { RequestStatus } from './request-status';
import { NoConflictStyleCompatibilityMode, Md2Module } from 'md2';
//import {} from '@angular/material';
import { TeamComponent } from './team/team.component';
import { ChatComponent } from './chat/chat.component';
import { NgxPaginationModule } from 'ngx-pagination'; 


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    AppheaderComponent,
    AppfooterComponent,
    AppmenuComponent,
    AppsettingComponent,
    LoginComponent,
    AdminHomeComponent,
    AdminLayoutComponent,
    SiteLayoutComponent,
    SiteLayoutComponent,
    ChatComponent,
    TeamComponent  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CodeFreakMaterialModuleModule,
    SecurityModule,
    ProblemModule,
    ProblemTypeModule,
    ProblemTypeModule,
    DifficultyModule,
    ProgrammingLanguageModule,
    ToastModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ToastrModule.forRoot({ timeOut:3000 }),
    LoadingBarHttpClientModule,
    EventModule,
    NoConflictStyleCompatibilityMode,
    Md2Module,
    NgxPaginationModule,
    RouterModule.forRoot([
      {
        path: '', component: SiteLayoutComponent,
        children: [
          { path: 'chat', component: ChatComponent, canActivate: [AdminRoleGuard]},
          { path: 'team', component: TeamComponent },
          { path: 'home', component: HomeComponent }
        ]
      },
    ])
  ],
  providers: [AdminRoleGuard, RequestStatus],
  bootstrap: [AppComponent],
  exports: [ProblemModule]
})
export class AppModule { }


