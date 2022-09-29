import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BotService } from 'src/app/services/bot.service';
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
  pActs: any;
  pProxys: any;

  notification: any;
  payload: any;
  ipBot: any;
  dataBot: any;

  constructor(
    // public userService: UserService,
    public nav: NavbarService,
    public socketWebService: SocketWebService,
    public companyService: CompanyService,
    public botService: BotService,
    private router: Router,
    private socket: SocketWebService
  ) {}

  ngOnInit(): void {
    this.nav.getAllNotifications();
  }

  AllowAccess(){
    console.log(this.payload);
    const data = {
      mac: this.payload.mac,
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
    console.log(this.notification);
    if (this.notification.from === null) {
      this.ipBot=this.notification.description.split(" ").pop()
    }
    const data = {
      state: true
    }
    this.payload=JSON.parse(this.notification.payload)
    console.log(this.payload);
    console.log(this.ipBot);
    this.nav.updateNotificationById(this.notification._id, data).subscribe(
      (data: any) => {
        this.nav.getAllNotifications();
        this.nav.getNotifications();
      }
    )
  }

  getDataBot(){
    this.botService.getBotContainerByIp(this.ipBot).subscribe(
      (data: any) => {
        this.dataBot=data.dataBotContainer
        jQuery("#viewNotify").modal("hide");
        this.router.navigate([`/dashboard/superUser/botContainers/${this.dataBot._id}/proxys`]);
      }
    )
  }

  deleteActs(){
    const body = {
      payload: this.payload.cuentas
    }
    this.botService.deleteActsSuperU(this.ipBot, body).subscribe(
      (data: any) => {
        jQuery("#viewNotify").modal("hide");
        Swal.fire({
          icon: 'success',
          title: 'Cuentas eliminadas correctamente',
          showConfirmButton: false,
          timer: 2000
        })
      }
    )
  }  

}
