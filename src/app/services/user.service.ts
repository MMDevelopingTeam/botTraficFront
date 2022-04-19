import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlSignIn = `${environment.url}/user/signin`;
  urlSignUp = `${environment.url}/user/signup`;

  constructor(private http: HttpClient, private router: Router) { }

  signIn(userSignIn:any) {
    return this.http.post(this.urlSignIn, userSignIn);
  }
  signUp(userSignup:any) {
    return this.http.post(this.urlSignUp, userSignup);
  }

  loggedIn() {
    return  !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/'])
  }
}
