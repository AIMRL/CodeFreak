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
import { CompilationModule } from './compilation/compilation.module';

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
    SiteLayoutComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CodeFreakMaterialModuleModule,
    SecurityModule,
    CompilationModule,
    RouterModule.forRoot([

      {
        path: '', component: AdminLayoutComponent, canActivate: [AdminRoleGuard],
        
        children: [
          { path: 'counter', component: CounterComponent, canActivate: [AdminRoleGuard] },
        ]
      },
      { path: 'login', component: LoginComponent },
      {
        path: '', component: SiteLayoutComponent,
        children: [
          { path: 'fetch-data', component: FetchDataComponent },

        ]
      },
    ])
  ],
  providers: [AdminRoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
