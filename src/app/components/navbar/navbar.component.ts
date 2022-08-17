import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NavbarService } from '../../services/navbar.service';
import { SocketWebService } from 'src/app/services/socket-web.service';
import { Router } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  ifToken:any
  notifications: any;

  p: any;

  constructor(
    public userService: UserService,
    public nav: NavbarService,
    public socketWebService: SocketWebService,
    private router: Router,
    private socket: SocketWebService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('tokenSuperU')) {
      this.ifToken=true
    }
    // this.socket.listen('mensaje-nuevo').subscribe(
    //   (data:any) => {
    //     console.log(data);
    //   }
    // )
    // this.socket.emitNotiy('mensaje', 'hola')
    this.nav.getNotifications();
    this.nav.getAllNotifications();
    this.socket.listen("mensaje-privado").subscribe(
      (data:any) => {
        // console.log(data)
        this.socket.new_notify=true
        this.nav.getNotifications();
        this.nav.getAllNotifications();
      }
    )
  }

  backNav(){
    jQuery('.navbar-nav>li').on('click', function(){
      jQuery('.navbar-collapse').collapse('hide');
  });
  }

  backNavLg(){
    jQuery('.collapse>button').on('click', function(){
      jQuery('.navbar-collapse').collapse('hide');
    });
  }
  logOut() {
    this.backNavLg();
    this.userService.logout();
  }

  redirect(){
    jQuery("#exampleModal").modal("hide");
    if (localStorage.getItem('idUserAdmin')) {
      this.router.navigate([`/dashboard/userAdmin/notifications`]);
      return
    }
    this.router.navigate([`/dashboard/notifications`]);
  }

}