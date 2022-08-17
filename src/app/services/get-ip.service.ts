import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GetIpService {

  API_KEY = environment.API_KEY;

  constructor(
    private http:HttpClient
  ) { }

  getIPAddress() {
    return this.http.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${this.API_KEY}`);  
  } 
  
}
