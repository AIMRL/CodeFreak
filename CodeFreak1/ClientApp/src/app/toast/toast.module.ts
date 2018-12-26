import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinkToast } from './pink.toast';
import { NotyfToast } from './notyf.toast';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PinkToast,NotyfToast],
  entryComponents:[PinkToast,NotyfToast]
})
export class ToastModule { }
