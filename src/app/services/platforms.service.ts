import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {

  urlPlatforms = `${environment.url}/platform`;

  constructor(
    private http: HttpClient
  ) { }

  createPlatform(Platform:any) {
    return this.http.post(this.urlPlatforms, Platform);
  }
  getPlatforms() {
    return this.http.get(this.urlPlatforms);
  }
  getPlatformById(id:any) {
    return this.http.get(`${this.urlPlatforms}/${id}`);
  }
  getPlatformByName(name:any) {
    return this.http.get(`${this.urlPlatforms}/findByName/${name}`);
  }
  updatePlatform(Platform:any, id:any) {
    return this.http.put(`${this.urlPlatforms}/${id}`, Platform);
  }
  deletePlatform(id:any) {
    return this.http.delete(`${this.urlPlatforms}/${id}`);
  }
}
