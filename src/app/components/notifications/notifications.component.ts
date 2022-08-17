import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { SocketWebService } from 'src/app/services/socket-web.service';
import Swal from 'sweetalert2'

declare var jQuery:any;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  
  p: any;

  notification: any;
  payload: any;

  constructor(
    // public userService: UserService,
    public nav: NavbarService,
    public socketWebService: SocketWebService,
    public companyService: CompanyService,
    private router: Router,
    private socket: SocketWebService
  ) {}

  ngOnInit(): void {
    this.nav.getAllNotifications();
  }

  AllowAccess(){
    console.log(this.payload);
    const data = {
      sourceIP: this.payload.sourceIP,
      User_idUser: "",
      company_idCompany: ""
    }
    if (this.notification.fromUser) {
      data.company_idCompany=this.notification.fromUser.company_idCompany._id
      data.User_idUser=this.notification.fromUser._id
      this.companyService.AllowAccess(data).subscribe(
        (data:any) => {
          jQuery("#viewNotify").modal("hide");
          Swal.fire({
            icon: 'success',
            title: 'Dispositivo permitido correctamente',
            showConfirmButton: false,
            timer: 2000
          })
        }
      )
    }else{
      data.company_idCompany=this.notification.from.company_idCompany._id
      data.User_idUser=this.notification.from._id
      this.companyService.AllowAccessUSerA(data).subscribe(
        (data:any) => {
          jQuery("#viewNotify").modal("hide");
          Swal.fire({
            icon: 'success',
            title: 'Dispositivo permitido correctamente',
            showConfirmButton: false,
            timer: 2000
          })
        }
      )
    }
  }

  getNotification(notif: any){
    this.notification=notif
    const data = {
      state: true
    }
    this.payload=JSON.parse(this.notification.payload)
    this.nav.updateNotificationById(this.notification._id, data).subscribe(
      (data: any) => {
        this.nav.getAllNotifications();
        this.nav.getNotifications();
      }
    )
  }

}
