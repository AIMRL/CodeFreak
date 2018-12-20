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

@NgModule({
  imports: [
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
          { path: 'allProblems', component: ProblemsListComponent },
          { path: 'allProblems/:diffType', component: ProblemsListComponent },
          { path: 'allProblems/:probType', component: ProblemsListComponent }

        ]
      }
    ])
  ],
  declarations: [ProblemComponent, CreateProbemComponent, ProblemsListComponent],
  providers: [ProblemService, CompilerResultViewModel, CodeViewModel, ProblemViewModel, ProblemCompleteViewModel]
})
export class ProblemModule { }
