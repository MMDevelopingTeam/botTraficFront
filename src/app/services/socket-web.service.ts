import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketWebService {

  new_notify: boolean = false;
  public socketStatus = false;
  public usuario: any;

  constructor(
    private socket: Socket
  ) {
    this.checkStatus();
    this.cargarStorage();
    this.socket.on("new-notification", (data: any) => {
      console.log(data);
      if (data) {
        this.new_notify=true
      }
    })
  }

  checkStatus(){
    this.socket.on('connect', () => {
      console.log("Conectado al servidor");
      this.socketStatus=true;
      this.cargarStorage();
    })
    this.socket.on('disconnect', () => {
      console.log("desconectado del servidor");
      this.socketStatus=false;
    })
  }

  configUser(payload: any) {
    return new Promise<void>((resolve, reject) => {
      console.log('Configurando', payload);
      this.emitNotiy('configurar-usuario', payload, (resp: any) => {
        console.log(resp);
        resolve();
      })
    })
  }

  emitNotiy (event: string, payload?: any, callback?: Function) {
    console.log("emitiendo", event);
    this.socket.emit(event, payload)
  }

  guardarIDUser(id: any){
    localStorage.setItem('id', id)
  }

  cargarStorage(){
    if (localStorage.getItem('id')) {
      this.usuario=localStorage.getItem('id')
      const payload = {
        userId: this.usuario
      }
      this.configUser(payload)
    }
  }

  listen(event: string) {
    return this.socket.fromEvent(event);
  }

  new_Ntf() {
    return !!this.new_notify
  }

  getNotifyPrivate() {
    return this.listen("new-notification");
  }

}
