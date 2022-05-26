import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  urlStorage = `${environment.urlLaunch}/storage`;
  urlBot = `${environment.urlLaunch}/bot`;

  constructor(private http: HttpClient) { }

  getModels() {
    return this.http.get(`${this.urlStorage}/getmodels`);
  }
  getProxys() {
    return this.http.get(`${this.urlStorage}/getproxys`);
  }
  getKillBotsByModel(data: any) {
    return this.http.post(`${this.urlStorage}/getKillBotsByModel`, data);
  }
  getAccts() {
    return this.http.get(`${this.urlStorage}/getaccts`);
  }
  launchBot(name_model: any) {
    return this.http.post(`${this.urlBot}`, name_model)
  }
  killBot(name_model: any) {
    return this.http.post(`${this.urlBot}/killbot`, name_model)
  }

}
