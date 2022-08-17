import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

declare var jQuery:any;

@Component({
  selector: 'app-allowed-devices',
  templateUrl: './allowed-devices.component.html',
  styleUrls: ['./allowed-devices.component.scss']
})
export class AllowedDevicesComponent implements OnInit {
  url: any;
  id: any;
  company: any;

  p:any

  user: any

  userForm: FormGroup
  deviceForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private navbarService: NavbarService,
    private NotificationService: NotificationService,
    private router: Router,
    private companyService: CompanyService,
    private userService: UserService,
    private _location: Location,
    private fb: FormBuilder,
  ) {
    this.userForm = this.fb.group({
      user: ['', Validators.required],
      company_idCompany: [''],
    });

    this.deviceForm = this.fb.group({
      sourceIP: ['', Validators.required],
      company_idCompany: [''],
      User_idUser: [''],
    });
  }

  ngOnInit(): void {
    this.url=this.router.url.split('/')[1]
    this.route.params.subscribe(params => {
      this.id=params.id;
    });
    this.navbarService.show();
    this.getInfoComp();
  }

  getInfoComp() {
    this.companyService.getCompanyById(this.id).subscribe(
      (data:any) => {
        console.log(data);
        this.company=data.dataCompany
        console.log(this.company);
      }
    )
  }

  searchUser(){
    if (this.userForm.valid) {
      let value = this.userForm.value
      value.company_idCompany=this.id
      this.userService.getUserByUserAndUserA(value).subscribe(
        (data:any) => {
          this.user=data.dataUserA
          console.log(this.user);
          this.NotificationService.showSuccess('Usuario encontrado correctamente')
        }
      )
    }
  }

  createDevice() {
    if (this.deviceForm.valid) {
      let value = this.deviceForm.value
      value.User_idUser=this.user._id
      value.company_idCompany=this.id
      this.companyService.createAllowedDeviceUserAdmin(value).subscribe(
        (data:any) => {
          jQuery("#deviceModal").modal("hide");
          this.getInfoComp();
          Swal.fire({
            icon: 'success',
            title: 'Dispositivo creado correctamente',
            showConfirmButton: false,
            timer: 2500
          })
          this.resetForm();
        }
      )
    }
  }

  deleteDevice(id: any) {
    Swal.fire({
      title: '¿Estas seguro de eliminar el dispositivo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.companyService.deleteAllowedDevice(id).subscribe(
          (data: any) => {
            Swal.fire({
              icon: 'success',
              title: 'dispositivo eliminado correctamente',
              showConfirmButton: false,
              timer: 2500
            })
            this.getInfoComp();
          },
          err => console.log(err)
        )
      }
    })
  }

  goBack() {
    this._location.back();
  }

  resetForm(){
    this.userForm.reset()
    this.deviceForm.reset()
    this.user=undefined;
  }

  getValueFormUser(value: string) {
    return this.userForm.get(value)
  }
  getValueFormDevice(value: string) {
    return this.deviceForm.get(value)
  }

}
