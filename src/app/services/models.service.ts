import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  urlModel = `${environment.url}/model`;
  urlRegister = `${environment.url}/tableLogLaunch`;

  constructor(private http: HttpClient) { }

  createModel(model:any) {
    return this.http.post(this.urlModel, model);
  }
  getModels() {
    return this.http.get(this.urlModel);
  }
  getModelById(id:any) {
    return this.http.get(`${this.urlModel}/${id}`);
  }
  getModelsByIDheadQ(id:any) {
    return this.http.get(`${this.urlModel}/byHeadquarter/${id}`);
  }
  getModelByIDPlatform(model:any, id:any) {
    const data={
      nickname: model
    }
    return this.http.post(`${this.urlModel}/platform/${id}`, data);
  }
  getModelFull(data:any) {
    return this.http.post(`${this.urlModel}/getModelFull`, data);
  }
  updateModel(model:any, id:any) {
    return this.http.put(`${this.urlModel}/${id}`, model);
  }
  deleteModel(id:any) {
    return this.http.delete(`${this.urlModel}/${id}`);
  }

  ///////////////////////////////
  ///////////////////////////////
  ///////    registers      /////
  ///////////////////////////////
  ///////////////////////////////

  getRegisters(id:any) {
    return this.http.get(`${this.urlRegister}/user/${id}`);
  }
  createRegister(data:any) {
    return this.http.post(`${this.urlRegister}`, data);
  }

}
