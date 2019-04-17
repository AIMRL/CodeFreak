import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeFreakMaterialModuleModule } from '../Angular Material/code-freak-material-module/code-freak-material-module.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { CreateEventComponent } from './create-event/create-event.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { Md2Module, Md2TabsModule } from 'md2';
import { SiteLayoutComponent } from '../layouts/site-layout/site-layout.component';
import { EventHomeComponent } from './event-home/event-home.component';
import { EventProblemsComponent } from './event-problems/event-problems.component';
import { EventUsersComponent } from './event-users/event-users.component';
import { EventSubmissionsComponent } from './event-submissions/event-submissions.component';
import { EventBoardComponent } from './event-board/event-board.component';
import { EventProblemsViewModel } from './dtos/event-problems-view-model';
import { ProblemModule } from '../problem/problem.module';
import { UserEventHomeComponent } from './user-event-home/user-event-home.component';
import { UserEventProblemsComponent } from './user-event-problems/user-event-problems.component';
import { EventProblemEditorComponent } from './event-problem-editor/event-problem-editor.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { AdminEventHomeComponent } from './admin-event-home/admin-event-home.component';
import { EventManegeComponent } from './event-manege/event-manege.component';
import { EventManager } from '@angular/platform-browser';
import { EventRouteGuard } from '../Gaurds/event-route.guard';
import { AdminRoleGuard } from '../Gaurds/admin-role.guard';
import { NgxPaginationModule } from 'ngx-pagination'; 


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CodeFreakMaterialModuleModule,
    Md2Module,
    Md2TabsModule,
    ProblemModule,
    AceEditorModule,
    NgxPaginationModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '', component: SiteLayoutComponent, children: [
          { path: 'create-event', component: CreateEventComponent, canActivate: [AdminRoleGuard]},
          { path: 'create-event', component: EventHomeComponent },
          { path: 'event-home/:eventId', component: EventHomeComponent, canActivate: [AdminRoleGuard]},
          { path: 'event/:id', component: UserEventHomeComponent, canActivate: [AdminRoleGuard]},
          { path: 'event-ad/:id', component: AdminEventHomeComponent, canActivate: [AdminRoleGuard] },
          { path: 'event-m/:id', component: EventManager, canActivate: [AdminRoleGuard, EventRouteGuard] }
        ]
      }
      //{ path: 'event-problem', component: EventProblemsComponent },
      //{ path: 'event-sub', component: EventSubmissionsComponent },
      //{ path: 'event-user', component: EventUsersComponent },
      //{ path: 'user-event-prob', component: UserEventProblemsComponent }

    ])

  ],
  declarations: [CreateEventComponent, EventHomeComponent, EventProblemsComponent, EventUsersComponent, EventSubmissionsComponent, EventBoardComponent, UserEventHomeComponent, UserEventProblemsComponent, EventProblemEditorComponent, AdminEventHomeComponent, EventManegeComponent]
})
export class EventModule { }
