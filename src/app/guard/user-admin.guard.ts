import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserAdminGuard implements CanActivate {


  constructor (
    private userService: UserService,
    private router: Router
  ){}
  
  canActivate(): boolean {
    if (localStorage.getItem('idUserAdmin')) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
