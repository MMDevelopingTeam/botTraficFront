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

  urlSignInUserAdmin = `${environment.url}/userAdmin/signin`;
  urlSignUpUserAdmin = `${environment.url}/userAdmin/signup`;

  urlUser = `${environment.url}/user`;
  urlUserAdmin = `${environment.url}/userAdmin`;
  urlUserType = `${environment.url}/userType`;

  constructor(private http: HttpClient, private router: Router) { }

  signIn(userSignIn:any) {
    return this.http.post(this.urlSignIn, userSignIn);
  }
  signUp(userSignup:any) {
    return this.http.post(this.urlSignUp, userSignup);
  }

  signInUserAdmin(userSignIn:any) {
    return this.http.post(this.urlSignInUserAdmin, userSignIn);
  }
  signUpUserAdmin(userSignup:any) {
    return this.http.post(this.urlSignUpUserAdmin, userSignup);
  }

  getUserByEmail(email:any) {
    return this.http.get(`${this.urlUser}/email/${email}`)
  }
  getUserAdminByEmail(email:any) {
    return this.http.get(`${this.urlUserAdmin}/email/${email}`)
  }

  getInfoUser() {
    return this.http.get(`${this.urlUser}/byToken`)
  }

  getUsers(id:string) {
    return this.http.get(`${this.urlUser}/headquarterId/${id}`)
  }

  deleteUser(id:string) {
    return this.http.delete(`${this.urlUser}/${id}`)
  }

  getInfoUserAdmin() {
    return this.http.get(`${this.urlUserAdmin}/byToken`)
  }
  updateUser(id: any, user: any) {
    return this.http.put(`${this.urlUser}/${id}`, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  updateUserAdminIsConfigFull(id:any) {
    const data={
      isConfigFull: true
    }
    return this.http.put(`${this.urlUserAdmin}/${id}`, data);
  }

  getUserTypes() {
    return this.http.get(`${this.urlUserType}`);
  }

  getTokenBot(data: any) {
    return this.http.post(`${this.urlUser}/getTokenBot`, data);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('idUser');
    localStorage.removeItem('idUserAdmin');
    this.router.navigate(['/'])
  }
}
