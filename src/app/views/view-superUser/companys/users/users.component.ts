import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2'
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from '../../../../services/notification.service';

declare var jQuery:any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  idCompany: any;
  usersAdmin: any;
  userAdmin: any;
  userAdminEditForm: FormGroup;
  userAdminCreateForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private NotificationService: NotificationService,
    private _location: Location,
    private fb: FormBuilder,
  ) {
    this.route.params.subscribe(params => {
      this.idCompany=params.id;
    });
    this.userAdminEditForm = this.fb.group({
      name: ['', Validators.required],
      user: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.userAdminCreateForm = this.fb.group({
      name: ['', Validators.required],
      user: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      VerifiedPassword: ['', [Validators.required, Validators.minLength(6)]],
      company_idCompany: [this.idCompany]
    });
  }

  ngOnInit(): void {
    this.getUsersAdmin();
    this.route.params.subscribe(params => {
      this.idCompany=params.id;
    });
  }

  getUsersAdmin(){
    this.userService.getUsersAdminByIdEmp(this.idCompany).subscribe(
      (data: any) => {
        this.usersAdmin=data.dataUser
      },
      err => {}
    )
  }

  getUserAdmin(user: any){
    this.userAdmin=user
  }

  restartPass(id:any){
    Swal.fire({
      title: 'Restaurar',
      text: "¿Estas seguro que quieres restaurar el password?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Restaurar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.restartPass(id).subscribe(
          (data:any) => {
            this.getUsersAdmin();
            Swal.fire({
              icon: 'success',
              title: 'Password restaurado correctamente',
              showConfirmButton: false,
              timer: 2000
            })
          },
          err => {}
        )
      }
    })
  }

  deleteUserAdmin(id:any){
    Swal.fire({
      title: 'Eliminar',
      text: "¿Estas seguro que quieres eliminar el usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUserAdmin(id).subscribe(
          (data:any) => {
            this.getUsersAdmin();
            Swal.fire({
              icon: 'success',
              title: 'Usuario eliminado correctamente',
              showConfirmButton: false,
              timer: 2500
            })
          },
          err => {}
        )
      }
    })
  }

  createUserAdmin(){
    if (this.userAdminCreateForm.valid) {
      let value = this.userAdminCreateForm.value
      if (value.password !== value.VerifiedPassword) {
        return this.NotificationService.showErr('Las contraseñas no coinciden')
      }
      this.userService.signUpUserAdmin(this.userAdminCreateForm.value).subscribe(
        (data:any) => {
          this.getUsersAdmin();
          jQuery("#createUserAdminModal").modal("hide");
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado correctamente',
            showConfirmButton: false,
            timer: 2500
          })
        },
        err => {}
      )
    }
  }

  UpdateUserAdmin(){
    if (this.userAdminEditForm.valid) {
      this.userService.updateUserAdmin(this.userAdminEditForm.value, this.userAdmin._id).subscribe(
        (data:any) => {
          this.getUsersAdmin();
          jQuery("#editUserAdminModal").modal("hide");
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado correctamente',
            showConfirmButton: false,
            timer: 2500
          })
        },
        err => {}
      )
    }
  }

  goBack(){
    this._location.back();
  }

  getValue(value: string) {
    return this.userAdminEditForm.get(value)
  }
  getValueCreate(value: string) {
    return this.userAdminCreateForm.get(value)
  }

}
