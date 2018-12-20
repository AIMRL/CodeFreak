import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgrammingLanguageService } from './programming-language.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeFreakMaterialModuleModule } from '../Angular Material/code-freak-material-module/code-freak-material-module.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CodeFreakMaterialModuleModule,
    RouterModule,
  ],
  declarations: [],
  providers: [ProgrammingLanguageService]
})
export class ProgrammingLanguageModule { }
