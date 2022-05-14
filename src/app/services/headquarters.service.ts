import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeadquartersService {

  urlHeadquarter = `${environment.url}/headquarter`;
  constructor(private http: HttpClient, private router: Router) { }
  
  createHeadquarter(headquarter:any) {
    return this.http.post(this.urlHeadquarter, headquarter);
  }
  getHeadquarters() {
    return this.http.get(this.urlHeadquarter);
  }
  getHeadquarterById(id:any) {
    return this.http.get(`${this.urlHeadquarter}/${id}`);
  }
  getheadquarterByIDCompany(id:any) {
    return this.http.get(`${this.urlHeadquarter}/company/${id}`);
  }
  updateHeadquarter(headquarter:any, id:any) {
    return this.http.put(`${this.urlHeadquarter}/${id}`, headquarter);
  }
  deleteHeadquarter(id:any) {
    return this.http.delete(`${this.urlHeadquarter}/${id}`);
  }

}
