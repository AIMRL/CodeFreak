import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeFreakMaterialModuleModule } from '../Angular Material/code-freak-material-module/code-freak-material-module.module';
import { RouterModule } from '@angular/router';
import { ProblemComponent } from './problem/problem.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { CompilerResultViewModel } from './dtos/compiler-result-view-model';
import { CodeViewModel } from './dtos/code-view-model';
import { CreateProbemComponent } from './create-probem/create-probem.component';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ProblemViewModel } from './dtos/problem-view-model';
import { ProblemService } from './problem.service';
import { AppheaderComponent } from '../layouts/appheader/appheader.component';
import { SiteLayoutComponent } from '../layouts/site-layout/site-layout.component';
import { ProblemsListComponent } from './problems-list/problems-list.component';
import { ProblemCompleteViewModel } from './dtos/problem-complete-view-model';
import { SubmissionComponent } from './submission/submission.component';
import { TestComponent } from './test/test.component';

import { MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule,MatListModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { SubmissionViewModel } from './dtos/submission-view-model';
import { ResultComponent } from './result/result.component';

import { AdminRoleGuard } from '../Gaurds/admin-role.guard';
import { SubmissionDetailComponent } from './submission-detail/submission-detail.component';
import { UrlDetailComponent } from './url-detail/url-detail.component';




@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    CodeFreakMaterialModuleModule,
    AceEditorModule,
    CodeFreakMaterialModuleModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '', component: SiteLayoutComponent, children: [
          { path: 'problem/:id', component: ProblemComponent },
          { path: 'create-problem', component: CreateProbemComponent },

          { path: 'submission', component: SubmissionComponent },

          { path: 'test', component: TestComponent },

          { path: 'allProblems', component: ProblemsListComponent, canActivate: [AdminRoleGuard] },
          { path: 'allProblems/:which/:name', component: ProblemsListComponent, canActivate: [AdminRoleGuard] },
          { path: 'result', component: ResultComponent },
          { path: 'submissionDetail/:id', component: SubmissionDetailComponent },
          { path: 'urlDetail/:url', component: UrlDetailComponent }


        ]
      }
    ])
  ],
  providers: [ProblemService, CompilerResultViewModel, CodeViewModel, ProblemViewModel, ProblemCompleteViewModel, SubmissionViewModel],
  exports: [CreateProbemComponent, ProblemComponent],
  declarations: [ProblemComponent, CreateProbemComponent, ProblemsListComponent, SubmissionComponent, TestComponent, ResultComponent, SubmissionDetailComponent, UrlDetailComponent]
})
export class ProblemModule { }
