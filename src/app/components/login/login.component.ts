import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { NavbarService } from 'src/app/services/navbar.service';
import { CompanyService } from 'src/app/services/company.service';
import { SocketWebService } from 'src/app/services/socket-web.service';
import { GetIpService } from 'src/app/services/get-ip.service';
import { LicensesService } from 'src/app/services/licenses.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin:any;

  private isValidEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  loginForm: FormGroup;
  ip_address: any;
  idComp: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private companyService: CompanyService,
    private getIpService: GetIpService,
    public nav: NavbarService,
    public socket: SocketWebService,
    ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['']
    });
  }

  ngOnInit(): void {
    this.nav.hide();
    this.getIpService.getIPAddress().subscribe(
      (data:any) => {
        this.ip_address=data.ip_address
        console.log(this.ip_address);
      }
    )
  }

  saveLogin(event: Event) {
    event.preventDefault();
    if (this.loginForm.valid) {
      const value = this.loginForm.value;
      value.address=this.ip_address;
      this.userService.signIn(value).subscribe(
        (res:any) => {
          if (environment.LOGIN_APP === true) {
            if (res.user.ipFrom) {
              const payload = {
                userId: res.user._id
              }
              localStorage.setItem('tokenSuperU', res.token);
              localStorage.setItem('idSuperUser', res.user._id);
              this.socket.guardarIDUser(res.user._id)
              this.socket.configUser(payload)
              Swal.fire({
                icon: 'success',
                title: "Login exitoso",
                showConfirmButton: false,
                timer: 1500
              })
              this.router.navigate(['/dashboard/superUser']);
              return
            }else{
              Swal.fire({
                icon: 'warning',
                title: "Inicie sesión desde la aplicación",
                showConfirmButton: false,
                timer: 1500
              })
              return;
            }
          }else {
            if (res.user.ipFrom) {
              const payload = {
                userId: res.user._id
              }
              localStorage.setItem('tokenSuperU', res.token);
              localStorage.setItem('idSuperUser', res.user._id);
              this.socket.guardarIDUser(res.user._id)
              this.socket.configUser(payload)
              Swal.fire({
                icon: 'success',
                title: "Login exitoso",
                showConfirmButton: false,
                timer: 1500
              })
              this.router.navigate(['/dashboard/superUser']);
              return
            }else{
              this.companyService.getAllowedDevicesByIdUser(res.user._id).subscribe(
                (data:any) => {
                  console.log(data)
                  if (data.dataA.mac === this.ip_address) {
                    Swal.fire({
                      icon: 'success',
                      title: "Login exitoso",
                      showConfirmButton: false,
                      timer: 1500
                    })
                    if (res.user.company_idCompany) {
                      this.companyService.getCompanyById(res.user.company_idCompany._id).subscribe(
                        (data:any) => {
                          if (data.dataCompany.isConfigFull === false) {
                            this.router.navigate([`company/${res.user.company_idCompany._id}`]);
                          }
                        },
                        err => {
                        }
                      )
                    }
                    if (res.user.userTypeArray && res.user.company_idCompany) {
                      localStorage.setItem('token', res.token);
                      localStorage.setItem('idUser', res.user._id);
                      this.router.navigate(['/dashboard/user']);
                    }
                    if (res.user.company_idCompany && res.user.userType) {
                      localStorage.setItem('token', res.token);
                      localStorage.setItem('idUserAdmin', res.user._id);
                      const payload = {
                        userId: res.user._id
                      }
                      this.socket.guardarIDUser(res.user._id)
                      this.socket.configUser(payload)
                      this.router.navigate(['/dashboard/userAdmin']);
                    }
                  }else{
                    const payload = {
                      mac: this.ip_address,
                      description: "Acceso a un dispositivo nuevo"
                    }
                    const payloadConfig = {
                      userId: res.user._id
                    }
                    this.socket.guardarIDUser(res.user._id)
                    this.socket.configUser(payloadConfig)
                    if (res.user.company_idCompany && res.user.userType) {
                      this.nav.sendNotificationSuperUser(localStorage.getItem('id'), payload).subscribe(
                        (data:any) => {
                          Swal.fire({
                            icon: 'warning',
                            title: "Tu dispositivo no es valido",
                            text: "Hemos enviado una notificación al administrador para solucionar este problema.",
                            showConfirmButton: true
                          })
                        }
                      )
                    }
                    if (res.user.userTypeArray && res.user.company_idCompany) {
                      this.nav.sendNotificationUserAdmin(localStorage.getItem('id'), payload).subscribe(
                        (data:any) => {
                          Swal.fire({
                            icon: 'warning',
                            title: "Tu dispositivo no es valido",
                            text: "Hemos enviado una notificación al administrador para solucionar este problema.",
                            showConfirmButton: true
                          })
                        }
                      )
                    }
                  }
                },
                err => {
                  const payload = {
                    mac: this.ip_address,
                    description: "Acceso a un dispositivo nuevo"
                  }
                  const payloadConfig = {
                    userId: res.user._id
                  }
                  this.socket.guardarIDUser(res.user._id)
                  this.socket.configUser(payloadConfig)
                  if (res.user.company_idCompany && res.user.userType) {
                    this.nav.sendNotificationSuperUser(localStorage.getItem('id'), payload).subscribe(
                      (data:any) => {
                        Swal.fire({
                          icon: 'warning',
                          title: "Tu dispositivo no es valido",
                          text: "Hemos enviado una notificación al administrador para solucionar este problema.",
                          showConfirmButton: true
                        })
                      }
                    )
                  }
                  if (res.user.userTypeArray && res.user.company_idCompany) {
                    this.nav.sendNotificationUserAdmin(localStorage.getItem('id'), payload).subscribe(
                      (data:any) => {
                        Swal.fire({
                          icon: 'warning',
                          title: "Tu dispositivo no es valido",
                          text: "Hemos enviado una notificación al administrador para solucionar este problema.",
                          showConfirmButton: true
                        })
                      }
                    )
                  }
                }
              )
            }
          }

        },
        err => {}
      )
    } else{
      this.loginForm.markAllAsTouched();
    }
  }

  getValue(value: string) {
    return this.loginForm.get(value)
  }
}
