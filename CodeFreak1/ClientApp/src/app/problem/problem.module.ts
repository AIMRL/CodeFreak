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
      { path: 'problem', component: ProblemComponent },
      { path: 'create-problem', component: CreateProbemComponent },
    ])
  ],
  declarations: [ProblemComponent, CreateProbemComponent],
  providers: [ProblemService, CompilerResultViewModel, CodeViewModel, ProblemViewModel]
})
export class ProblemModule { }
