import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeFreakMaterialModuleModule } from '../Angular Material/code-freak-material-module/code-freak-material-module.module';
import { RouterModule } from '@angular/router';
import { ProblemTypeService} from './problem-type.service';


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
  providers: [ProblemTypeService]
})
export class ProblemTypeModule { }
