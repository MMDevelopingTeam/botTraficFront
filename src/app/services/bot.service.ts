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
    if (ip === undefined) {
      return this.http.get(`${environment.urlLaunchExpuesta}/storage/getproxys`);
    }
    return this.http.get(`http://${ip || 'localhost'}:3000/api/storage/getproxys`);
  }
  getAllProxysColor(ip: any) {
    if (ip === undefined) {
      return this.http.get(`${environment.urlLaunchExpuesta}/storage/getProxysColor`);
    }
    return this.http.get(`http://${ip || 'localhost'}:3000/api/storage/getProxysColor`);
  }
  getLatenciaProxys(ip: any) {
    if (ip === undefined) {
      return this.http.get(`${environment.urlLaunchExpuesta}/storage/msProxys`);
    }
    return this.http.get(`http://${ip || 'localhost'}:3000/api/storage/msProxys`);
  }

  getAllProxysFree(ip: any) {
    // return this.http.get(`${this.urlStorage}/getproxysFree`);
    if (ip === undefined) {
      return this.http.get(`${environment.urlLaunchExpuesta}/storage/getproxysFree`);
    }
    return this.http.get(`http://${ip || 'localhost'}:3000/api/storage/getproxysFree`);
  }
  getKillBotsByModel(ip: any, data: any) {
    if (ip === undefined) {
      return this.http.post(`${environment.urlLaunchExpuesta}/storage/getKillBotsByModel`, data);
    }
    return this.http.post(`http://${ip || 'localhost'}:3000/api/storage/getKillBotsByModel`, data);
  }

  getStatusBot(ip: any) {
    if (ip === undefined) {
      return this.http.get(`${environment.urlLaunchExpuesta}/bot`);
    }
    return this.http.get(`http://${ip || 'localhost'}:3000/api/bot`);
  }
  getAllAccts(ip: any) {
    if (ip === undefined) {
      return this.http.get(`${environment.urlLaunchExpuesta}/storage/getaccts`);
    }
    return this.http.get(`http://${ip || 'localhost'}:3000/api/storage/getaccts`);
    // return this.http.get(`${this.urlStorage}/getaccts`);
  }
  getAllAcctsFree(ip: any) {
    if (ip === undefined) {
      return this.http.get(`${environment.urlLaunchExpuesta}/storage/getAcctsFree`);
    }
    return this.http.get(`http://${ip || 'localhost'}:3000/api/storage/getAcctsFree`);
    // return this.http.get(`${this.urlStorage}/getAcctsFree`);
  }
  saveProxys(proxys:any, ip:any){
    if (ip === undefined) {
      return this.http.post(`${environment.urlLaunchExpuesta}/storage/proxysString`, proxys);
    }
    return this.http.post(`http://${ip || 'localhost'}:3000/api/storage/proxysString`, proxys);
  }
  saveProxysColor(proxys:any, ip:any){
    if (ip === undefined) {
      return this.http.post(`${environment.urlLaunchExpuesta}/storage/proxysColorString`, proxys);
    }
    return this.http.post(`http://${ip || 'localhost'}:3000/api/storage/proxysColorString`, proxys);
  }
  createIdPackProxy(proxys:any, ip:any){
    if (ip === undefined) {
      return this.http.post(`${environment.urlLaunchExpuesta}/storage/createIdPackProxy`, proxys);
    }
    return this.http.post(`http://${ip || 'localhost'}:3000/api/storage/createIdPackProxy`, proxys);
  }


  launchBot(ip: any, name_model: any) {
    if (ip === undefined) {
      return this.http.post(`${environment.urlLaunchExpuesta}/bot`, name_model);
    }
    return this.http.post(`http://${ip || 'localhost'}:3000/api/bot`, name_model)
    // return this.http.post(`http://localhost:3000/api/bot`, name_model)
  }
  killBot(ip: any, name_model: any) {
    if (ip === undefined) {
      return this.http.post(`${environment.urlLaunchExpuesta}/bot/killbot`, name_model);
    }
    return this.http.post(`http://${ip || 'localhost'}:3000/api/bot/killbot`, name_model)
    // return this.http.post(`http://localhost:3000/api/killbot`, name_model)
  }

  launchBotAny(ip: any, name_model: any) {
    if (ip === undefined) {
      return this.http.post(`${environment.urlLaunchExpuesta}/bot/getBotAny`, name_model);
    }
    return this.http.post(`http://${ip || 'localhost'}:3000/api/bot/getBotAny`, name_model)
    // return this.http.post(`http://localhost:3000/api/bot`, name_model)
  }
  killBotAny(ip: any, name_model: any) {
    if (ip === undefined) {
      return this.http.post(`${environment.urlLaunchExpuesta}/bot/killBotAny`, name_model);
    }
    return this.http.post(`http://${ip || 'localhost'}:3000/api/bot/killBotAny`, name_model)
    // return this.http.post(`http://localhost:3000/api/killbot`, name_model)
  }

  launchBotMixed(ip: any, name_model: any) {
    if (ip === undefined) {
      return this.http.post(`${environment.urlLaunchExpuesta}/bot/getBotMixed`, name_model);
    }
    return this.http.post(`http://${ip || 'localhost'}:3000/api/bot/getBotMixed`, name_model)
    // return this.http.post(`http://localhost:3000/api/bot`, name_model)
  }
  killBotMixed(ip: any, name_model: any) {
    if (ip === undefined) {
      return this.http.post(`${environment.urlLaunchExpuesta}/bot/killBotMixed`, name_model);
    }
    return this.http.post(`http://${ip || 'localhost'}:3000/api/bot/killBotMixed`, name_model)
    // return this.http.post(`http://localhost:3000/api/killbot`, name_model)
  }

  launchBotWithFollows(ip: any, name_model: any) {
    if (ip === undefined) {
      return this.http.post(`${environment.urlLaunchExpuesta}/bot/BotFollowers`, name_model);
    }
    return this.http.post(`http://${ip || 'localhost'}:3000/api/bot/BotFollowers`, name_model)
    // return this.http.post(`http://localhost:3000/api/bot`, name_model)
  }
  killBotWithFollows(ip: any, name_model: any) {
    if (ip === undefined) {
      return this.http.post(`${environment.urlLaunchExpuesta}/bot/killBotFollowers`, name_model);
    }
    return this.http.post(`http://${ip || 'localhost'}:3000/api/bot/killBotFollowers`, name_model)
    // return this.http.post(`http://localhost:3000/api/killbot`, name_model)
  }
  launchBotWithColor(ip: any, name_model: any) {
    if (ip === undefined) {
      return this.http.post(`${environment.urlLaunchExpuesta}/bot/BotColor`, name_model);
    }
    return this.http.post(`http://${ip || 'localhost'}:3000/api/bot/BotColor`, name_model)
    // return this.http.post(`http://localhost:3000/api/bot`, name_model)
  }
  killBotWithColor(ip: any, name_model: any) {
    if (ip === undefined) {
      return this.http.post(`${environment.urlLaunchExpuesta}/bot/killBotColor`, name_model);
    }
    return this.http.post(`http://${ip || 'localhost'}:3000/api/bot/killBotColor`, name_model)
    // return this.http.post(`http://localhost:3000/api/killbot`, name_model)
  }
  launchBotSendMessage(ip: any, name_model: any) {
    if (ip === undefined) {
      return this.http.post(`${environment.urlLaunchExpuesta}/bot/BotSendMessage`, name_model);
    }
    return this.http.post(`http://${ip || 'localhost'}:3000/api/bot/BotSendMessage`, name_model)
    // return this.http.post(`http://localhost:3000/api/bot`, name_model)
  }
  killBotSendMessage(ip: any, name_model: any) {
    if (ip === undefined) {
      return this.http.post(`${environment.urlLaunchExpuesta}/bot/killBotSendMessage`, name_model);
    }
    return this.http.post(`http://${ip || 'localhost'}:3000/api/bot/killBotSendMessage`, name_model)
    // return this.http.post(`http://localhost:3000/api/killbot`, name_model)
  }
  createActs(ip: any, body: any) {
    if (ip === undefined) {
      return this.http.post(`${environment.urlLaunchExpuesta}/accounts/accoutsbot`, body);
    }
    return this.http.post(`http://${ip || 'localhost'}:3000/api/accounts/accoutsbot`, body)
  }
  deleteActsSuperU(ip: any, body: any) {
    if (ip === undefined) {
      return this.http.post(`${environment.urlLaunchExpuesta}/accounts/deleteActsSuperUser`, body);
    }
    return this.http.post(`http://${ip || 'localhost'}:3000/api/accounts/deleteActsSuperUser`, body)
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
  getBotContainerByIp(ip:any) {
    return this.http.get(`${this.urlBotContainer}/ByIp/${ip}`);
  }
  getBotContainerByIdComp(id:any) {
    return this.http.get(`${this.urlBotContainer}/byIdCompany/${id}`);
  }
  updateBotContainer(BotContainer:any, id:any) {
    return this.http.put(`${this.urlBotContainer}/${id}`, BotContainer);
  }
  updateBotConatinerArrayComp(BotContainer:any, id:any) {
    return this.http.put(`${this.urlBotContainer}/updateAccts/${id}`, BotContainer);
  }
  deleteBotContainer(id:any) {
    return this.http.delete(`${this.urlBotContainer}/${id}`);
  }
  getRegisterCompanyBotContainer(id:any) {
    return this.http.get(`${this.urlBotContainer}/getRegisterCompanyBotContainer/${id}`);
  }
  validIdPackProxy(id:any) {
    return this.http.get(`${this.urlBotContainer}/validIdPackProxy/${id}`);
  }

  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  ////////          estadisticas         //////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////

  getStadistics() {
    return this.http.get(`${environment.url}/stadistics`);
  }
  getAllComp() {
    return this.http.get(`${environment.url}/stadistics/getAllComp`);
  }
  getAllLicences() {
    return this.http.get(`${environment.url}/stadistics/getAllLicences`);
  }
  getAllModels() {
    return this.http.get(`${environment.url}/stadistics/getAllModels`);
  }
  getAllplatforms() {
    return this.http.get(`${environment.url}/stadistics/getAllplatforms`);
  }
  getAllusers() {
    return this.http.get(`${environment.url}/stadistics/getAllusers`);
  }
  getAllusersAdmin() {
    return this.http.get(`${environment.url}/stadistics/getAllusersAdmin`);
  }
  getAccessLogs() {
    return this.http.get(`${environment.url}/user/getAccesslogs`);
  }
  getAccessLogsAdmin() {
    return this.http.get(`${environment.url}/userAdmin/getAccesslogs`);
  }
  getAccesslogsFalse() {
    return this.http.get(`${environment.url}/user/getAccesslogsFalse`);
  }
  getAccesslogsFalseAdmin() {
    return this.http.get(`${environment.url}/userAdmin/getAccesslogsFalse`);
  }
  getAllStatsAdmin(id: string) {
    return this.http.get(`${environment.url}/stadistics/getAllStatsAdmin/${id}`);
  }
}
