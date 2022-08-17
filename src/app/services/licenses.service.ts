import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LicensesService {

  urllicenses = `${environment.url}/licenses`;
  urlRegisterLicenses = `${environment.url}/registerLicenses`;

  constructor(private http: HttpClient, private router: Router) { }

  createLicense(license:any) {
    return this.http.post(this.urllicenses, license);
  }

  geLicenses() {
    return this.http.get(this.urllicenses);
  }
  getLicenseById(id:any) {
    return this.http.get(`${this.urllicenses}/${id}`);
  }
  updateLicense(license:any, id:any) {
    return this.http.put(`${this.urllicenses}/${id}`, license);
  }
  deleteLicense(id:any) {
    return this.http.delete(`${this.urllicenses}/${id}`);
  }



  ///////////////////////////////////////////////
  ///////////////////////////////////////////////
  //////        register Licenses         ///////
  ///////////////////////////////////////////////
  ///////////////////////////////////////////////


  createRegisterLicense(license:any) {
    return this.http.post(this.urlRegisterLicenses, license);
  }

  getRegisterLicensesByIDCompanyAndPlat(id:any, idPlatfom:any) {
    return this.http.post(`${this.urlRegisterLicenses}/compnayAndPlat/${id}`, idPlatfom);
  }

  getLicencesCompanyPlatform(data: any){
    return this.http.post(`${this.urlRegisterLicenses}/getLicencesCompanyPlatform`, data);
  }

  desactiveRegisterLicence(id:any){
    return this.http.get(`${this.urlRegisterLicenses}/disableRegisterLicenceByID/${id}`);
  }
  expirationLicencesByCompany(id:any){
    return this.http.get(`${this.urlRegisterLicenses}/expirationLicencesByCompany/${id}`);
  }
}
