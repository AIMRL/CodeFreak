import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PinkToast } from './pink.toast';
import { NotyfToast } from './notyf.toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  makePinkToast(title,message){
    this.toastr.show('Hello world!', 'Toastr fun!',{
      closeButton:true,
      progressBar:true,
      progressAnimation:'increasing',
      positionClass: 'toast-bottom-right',
      toastComponent:PinkToast,
      toastClass:'pinktoast',
   } );
  }
  makeNotyfToast(title,message){
    this.toastr.show(title, message,{
      closeButton:true,
      progressBar:true,
      progressAnimation:'increasing',
      positionClass: 'toast-bottom-right',
      toastComponent:NotyfToast,
      toastClass : 'notyf confirm'      
   } );
  }

  makeSuccess(title, message) {
    this.toastr.success(message, title, {
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right',
      enableHtml: true,
    });
  }

  makeWarning(title, message) {
    this.toastr.warning(message, title, {
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
      enableHtml: true,
    });
  }

  makeInfo(title, message) {
    this.toastr.info(message, title, {
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
      enableHtml: true,
    });
  }

  makeError(title, message) {
    this.toastr.error(message, title, {
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right',
      enableHtml: true,
    });
  }
  clearToasts() {
    this.toastr.clear();
  }
}
