import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeFreakMaterialModuleModule } from '../Angular Material/code-freak-material-module/code-freak-material-module.module';
import { RouterModule } from '@angular/router';
import { ProblemComponent } from './problem/problem.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { CompilerResultViewModel } from './dtos/compiler-result-view-model';
import { CodeViewModel } from './dtos/code-view-model';
import { CompilationService } from './compilation.service';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CodeFreakMaterialModuleModule,
    AceEditorModule,
    RouterModule.forRoot([
      { path: 'problem', component: ProblemComponent },

    ])
  ],
  declarations: [ProblemComponent],
  providers: [CompilationService, CompilerResultViewModel, CodeViewModel]
})
export class CompilationModule { }
