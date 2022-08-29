import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { SocketWebService } from 'src/app/services/socket-web.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-page-validate',
  templateUrl: './page-validate.component.html',
  styleUrls: ['./page-validate.component.scss']
})
export class PageValidateComponent implements OnInit {
  url: any;
  token: any;

  constructor(
    private nav: NavbarService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private socket: SocketWebService,
  ) { }

  ngOnInit(): void {
    this.nav.hide();
    this.url=this.router.url.split('/')[1]
    this.route.params.subscribe(params => {
      this.token=params.token
    });
    this.userService.verifyToken(this.token).subscribe(
      (data: any) => {
        console.log(data);
        if (data.success === false) {
          this.userService.logout();
          this.router.navigate([`/`]);
        }else{
          const dataT = {
            token: this.token
          }
          this.userService.TypeUserByToken(dataT).subscribe(
            (dataDos: any) => {
              console.log(dataDos);
              if (dataDos.user === true) {
                localStorage.setItem('token', this.token);
                localStorage.setItem('idUser', data.authData._id);
                localStorage.setItem('id', data.authData._id);
                const payload = {
                  userId: data.authData._id
                }
                this.socket.configUser(payload)
                this.router.navigate(['/dashboard/user']);
              }
              if (dataDos.userAdmin === true) {
                localStorage.setItem('token', this.token);
                localStorage.setItem('idUserAdmin', data.authData._id);
                localStorage.setItem('id', data.authData._id);
                const payload = {
                  userId: data.authData._id
                }
                this.socket.configUser(payload)
                this.router.navigate(['/dashboard/userAdmin']);
                
              }
              if (dataDos.superUser === true) {
                localStorage.setItem('tokenSuperU', this.token);
                localStorage.setItem('idSuperUser', data.authData._id);
                localStorage.setItem('id', data.authData._id);
                this.router.navigate(['/dashboard/superUser']);
              }
            }
          )
        }
      }  
    )
  }

}
