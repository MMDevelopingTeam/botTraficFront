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

  getUserByEmail(email:any) {
    return this.http.get(`${this.urlUser}/email/${email}`)
  }


  getInfoUser() {
    return this.http.get(`${this.urlUser}/byToken`)
  }

  getUsers(id:string) {
    return this.http.get(`${this.urlUser}/companyId/${id}`)
  }

  deleteUser(id:string) {
    return this.http.delete(`${this.urlUser}/${id}`)
  }


  updateUser(id: any, user: any) {
    return this.http.put(`${this.urlUser}/${id}`, user)
  }
  
  loggedIn() {
    if (localStorage.getItem('token') || localStorage.getItem('tokenSuperU')) {
      return true;
    }
    return false;
  }
  loggedInSuperU() {
    return !!localStorage.getItem('tokenSuperU');
  }
  
  getTypeUserByToken() {
    return this.http.get(`${this.urlUser}/getTypeUserByToken`)
  }

  getToken() {
    if (localStorage.getItem('tokenSuperU') && localStorage.getItem('idSuperUser')) {
      return localStorage.getItem('tokenSuperU');
    }
    return localStorage.getItem('token');
  }



  getTokenBot(data: any) {
    return this.http.post(`${this.urlUser}/getTokenBot`, data);
  }

  getTokenkillBot(data: any) {
    return this.http.post(`${this.urlUser}/getTokenkillBot`, data);
  }

  getTokenBotAny(data: any) {
    return this.http.post(`${this.urlUser}/getTokenBotAny`, data);
  }

  getTokenkillBotAny(data: any) {
    return this.http.post(`${this.urlUser}/getTokenkillBotAny`, data);
  }

  getTokenBotMixed(data: any) {
    return this.http.post(`${this.urlUser}/getTokenBotMixed`, data);
  }

  getTokenkillBotMixed(data: any) {
    return this.http.post(`${this.urlUser}/getTokenkillBotAny`, data);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('tokenSuperU');
    localStorage.removeItem('idUser');
    localStorage.removeItem('idUserAdmin');
    this.router.navigate(['/'])
  }





  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  ////////////////   USER ADMIN ////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////


  signInUserAdmin(userSignIn:any) {
    return this.http.post(this.urlSignInUserAdmin, userSignIn);
  }
  signUpUserAdmin(userSignup:any) {
    return this.http.post(this.urlSignUpUserAdmin, userSignup);
  }
  getUserAdminByEmail(email:any) {
    return this.http.get(`${this.urlUserAdmin}/email/${email}`)
  }
  getInfoUserAdmin() {
    return this.http.get(`${this.urlUserAdmin}/byToken`)
  }
  getUsersAdminByIdEmp(id:any){
    return this.http.get(`${this.urlUserAdmin}/company/${id}`);
  }
  updateUserAdmin(data:any, id:any){
    return this.http.put(`${this.urlUserAdmin}/${id}`, data);
  }
  deleteUserAdmin(id:any){
    return this.http.delete(`${this.urlUserAdmin}/${id}`);
  }
  restartPass(id:any){
    return this.http.get(`${this.urlUserAdmin}/resetPass/${id}`);
  }





  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////  USER TYPE ////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////

  createUserType(UserType:any) {
    return this.http.post(this.urlUserType, UserType);
  }
  getUserTypes() {
    return this.http.get(`${this.urlUserType}`);
  }
  getUserTypeById(id:any) {
    return this.http.get(`${this.urlUserType}/${id}`);
  }
  updateUserType(UserType:any, id:any) {
    return this.http.put(`${this.urlUserType}/${id}`, UserType);
  }
  updateUserTypeIsConfigFull(id:any) {
    const data={
      isConfigFull: true
    }
    return this.http.put(`${this.urlUserType}/${id}`, data);
  }
  deleteUserType(id:any) {
    return this.http.delete(`${this.urlUserType}/${id}`);
  }

}
