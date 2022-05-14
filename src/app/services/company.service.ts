import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  urlCompany = `${environment.url}/company`;

  constructor(private http: HttpClient, private router: Router) { }

  createCompany(company:any) {
    return this.http.post(this.urlCompany, company);
  }
  geCompanys() {
    return this.http.get(this.urlCompany);
  }
  getCompanyById(id:any) {
    return this.http.get(`${this.urlCompany}/${id}`);
  }
  updateCompany(company:any, id:any) {
    return this.http.put(`${this.urlCompany}/${id}`, company);
  }
  updateCompanyIsConfigFull(id:any) {
    const data={
      isConfigFull: true
    }
    return this.http.put(`${this.urlCompany}/${id}`, data);
  }
  deleteCompany(id:any) {
    return this.http.delete(`${this.urlCompany}/${id}`);
  }
}
