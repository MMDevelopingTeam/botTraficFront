import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { SocketWebService } from './socket-web.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  visible: boolean;
  notifications: any;
  Allnotifications: any;


  urlSockets = `${environment.url}/sockets`;

  constructor(
    private http: HttpClient,
    private socket: SocketWebService,
  ) { this.visible = true; }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }

  getNotifications() {
    if (localStorage.getItem('id')) {
      this.http.get(`${this.urlSockets}/notifications/${localStorage.getItem('id')}`).subscribe(
        (data: any) => {
          this.notifications=data.dataN
          //  console.log(this.notifications);
          if (data.dataN.length !== 0) {
            this.socket.new_notify=true
          }else{
            this.socket.new_notify=false
          }
        }
      )
    }
  }
  getAllNotifications() {
    if (localStorage.getItem('id')) {
      this.http.get(`${this.urlSockets}/AllNotifications/${localStorage.getItem('id')}`).subscribe(
        (data: any) => {
          this.Allnotifications=data.dataN
           console.log(this.Allnotifications);
          // this.socket.new_notify=true
        }
      )
    }
  }

  sendNotificationSuperUser(id: any, data: any){
    return this.http.post(`${this.urlSockets}/sendForSuperUser/${id}`, data)
  }
  sendNotificationUserAdmin(id: any, data: any){
    return this.http.post(`${this.urlSockets}/sendMessageForUserAdmin/${id}`, data)
  }

  updateNotificationById(id: any, data: any){
    return this.http.put(`${this.urlSockets}/notifications/${id}`, data)
  }

}
