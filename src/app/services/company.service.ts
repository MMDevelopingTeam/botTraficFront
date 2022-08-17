import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  urlCompany = `${environment.url}/company`;
  urlAllowedDevices = `${environment.url}/allowedDevices`;

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

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////          allowedDevices           /////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  createAllowedDevice(device:any) {
    return this.http.post(this.urlAllowedDevices, device);
  }
  createAllowedDeviceUserAdmin(device:any) {
    return this.http.post(`${this.urlAllowedDevices}/createAllowedDevicesUserAdmin`, device);
  }
  AllowAccess(device:any) {
    return this.http.post(`${this.urlAllowedDevices}/AllowAccess`, device);
  }
  AllowAccessUSerA(device:any) {
    return this.http.post(`${this.urlAllowedDevices}/AllowAccessUSerA`, device);
  }
  geAllowedDevices() {
    return this.http.get(this.urlAllowedDevices);
  }
  getAllowedDeviceById(id:any) {
    return this.http.get(`${this.urlAllowedDevices}/${id}`);
  }
  getAllowedDeviceByIp(ip:any) {
    return this.http.get(`${this.urlAllowedDevices}/ByIp/${ip}`);
  }
  getAllowedDevicesByIdUser(ip:any) {
    return this.http.get(`${this.urlAllowedDevices}/ByIdUser/${ip}`);
  }
  updateAllowedDevice(device:any, id:any) {
    return this.http.put(`${this.urlAllowedDevices}/${id}`, device);
  }
  deleteAllowedDevice(id:any) {
    return this.http.delete(`${this.urlAllowedDevices}/${id}`);
  }
}

