import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastService } from '../toast/toast.service';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private router: Router, private toast: ToastService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem("token")!=null) {
      return true;
    }
    this.toast.makeWarning("UnAuthorized", "Please login first");
    this.router.navigate(['home']);
    return false;
  }
}
