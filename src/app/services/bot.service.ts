import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  urlStorage = `${environment.urlLaunch}/storage`;
  urlBotContainer = `${environment.url}/botContainer`;
  urlModels = `${environment.url}/model`;

  constructor(private http: HttpClient) { }

  getAllProxys(ip: any) {
    return this.http.get(`http://${ip || 'localhost'}:3000/api/storage/getproxys`);
    // return this.http.get(`${this.urlStorage}/getproxys`);
  }
  getAllProxysFree(ip: any) {
    // return this.http.get(`${this.urlStorage}/getproxysFree`);
    return this.http.get(`http://${ip || 'localhost'}:3000/api/storage/getproxysFree`);
  }
  getKillBotsByModel(data: any) {
    return this.http.post(`${this.urlModels}/getKillBotsByModel`, data);
  }
  getAllAccts(ip: any) {
    return this.http.get(`http://${ip || 'localhost'}:3000/api/storage/getaccts`);
    // return this.http.get(`${this.urlStorage}/getaccts`);
  }
  getAllAcctsFree(ip: any) {
    return this.http.get(`http://${ip || 'localhost'}:3000/api/storage/getAcctsFree`);
    // return this.http.get(`${this.urlStorage}/getAcctsFree`);
  }
  saveProxys(proxys:any, ip:any){
    return this.http.post(`http://${ip || 'localhost'}:3000/api/storage/proxysString`, proxys);
  }


  launchBot(ip: any, name_model: any) {
    return this.http.post(`http://${ip || 'localhost'}:3000/api/bot`, name_model)
    // return this.http.post(`http://localhost:3000/api/bot`, name_model)
  }
  killBot(ip: any, name_model: any) {
    return this.http.post(`http://${ip || 'localhost'}:3000/api/bot/killbot`, name_model)
    // return this.http.post(`http://localhost:3000/api/killbot`, name_model)
  }

  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  ////////          bot container        //////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////

  createBotContainer(BotContainer:any) {
    return this.http.post(this.urlBotContainer, BotContainer);
  }
  getBotContainers() {
    return this.http.get(this.urlBotContainer);
  }
  getBotContainerById(id:any) {
    return this.http.get(`${this.urlBotContainer}/${id}`);
  }
  updateBotContainer(BotContainer:any, id:any) {
    return this.http.put(`${this.urlBotContainer}/${id}`, BotContainer);
  }
  deleteBotContainer(id:any) {
    return this.http.delete(`${this.urlBotContainer}/${id}`);
  }

}
