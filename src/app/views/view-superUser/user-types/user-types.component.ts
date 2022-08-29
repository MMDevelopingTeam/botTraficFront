import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserType } from 'src/app/models/userType';
import { NotificationService } from 'src/app/services/notification.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

declare var jQuery:any;

@Component({
  selector: 'app-user-types',
  templateUrl: './user-types.component.html',
  styleUrls: ['./user-types.component.scss']
})
export class UserTypesComponent implements OnInit {
  userTypes: any;
  userType: any;

  p:any;
  userTypesLength:any;

  userTypeEdit: UserType= {
    _id: '',
    nameUserType: '',
    descriptionUserType: '',
    permissionsArray: []
  };
  
  userTypeEditForm: FormGroup;
  userTypeCreateForm: FormGroup;

  arrayPermissions:any=[]
  permissions: any;

  constructor(
    private userService: UserService,
    private permissionsService: PermissionsService,
    private notificationService: NotificationService,
    private _location: Location,
    private fb: FormBuilder,
  ) {
    this.userTypeEditForm = this.fb.group({
      nameUserType: ['', Validators.required],
      descriptionUserType: [''],
      permissionsArray: [[]]
    });
    this.userTypeCreateForm = this.fb.group({
      nameUserType: ['', Validators.required],
      descriptionUserType: [''],
      permissionsArray: [[]]
    });
  }

  ngOnInit(): void {
    this.userService.tokenValidSuperU()
    this.getUserTypes();
    this.getPermissions();
  }

  getUserTypes(){
    this.userService.getUserTypes().subscribe(
      (data:any) => {
        this.userTypes=data.dataUserT
        this.userTypesLength=data.dataUserT.length
      },
      err => {}
    )
  }

  getUserType(userType: any) {
    this.userType=userType
    for (let index = 0; index < userType.permissionsArray.length; index++) {
      this.arrayPermissions.push(userType.permissionsArray[index]._id)
    }
  }
  getUserTypeEdit(userType: any) {
    this.userTypeEdit=userType
    for (let index = 0; index < userType.permissionsArray.length; index++) {
      this.arrayPermissions.push(userType.permissionsArray[index]._id)
    }
  }

  UpdateUserType(){
    this.userTypeEdit.permissionsArray=this.arrayPermissions
    this.userService.updateUserType(this.userTypeEdit, this.userTypeEdit._id).subscribe(
      (data:any) => {
        this.getUserTypes();
        Swal.fire({
          icon: 'success',
          title: 'Tipo de usuario actualizado correctamente',
          showConfirmButton: false,
          timer: 2500
        })
      },
      err => {}
    )
  }

  createUserType(){
    if (this.userTypeCreateForm.valid && this.arrayPermissions.length > 0) {
      let value = this.userTypeCreateForm.value
      value.permissionsArray=this.arrayPermissions
      this.userService.createUserType(value).subscribe(
        (data:any) => {
          this.getUserTypes();
          jQuery("#createUserTypeModal").modal("hide");
          Swal.fire({
            icon: 'success',
            title: 'Tipo de usuario creado correctamente',
            showConfirmButton: false,
            timer: 2500
          })
          this.arrayPermissions=[]
        },
        err => {}
      )
    }else{
      this.notificationService.showErr('Añade almenos un permiso')
    }
  }

  deleteUserType(id:any){
    Swal.fire({
      title: 'Eliminar',
      text: "¿Estas seguro que quieres eliminar el tipo de usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUserType(id).subscribe(
          (data:any) => {
            this.getUserTypes();
            Swal.fire({
              icon: 'success',
              title: 'Tipo de usuario eliminado correctamente',
              showConfirmButton: false,
              timer: 2500
            })
          },
          err => {}
        )
      }
    })
  }

  getPermissions(){
    this.permissionsService.gePermissions().subscribe(
      (data:any) => {
        this.permissions=data.dataPermissions
      },
      err => {}
    )
  }

  addPermission(permission: any){
    let i = this.arrayPermissions.indexOf(permission)
    if (i !== -1) {
      return this.notificationService.showErr('La licencia ya esta añadida')
    }
    this.arrayPermissions.push(permission)
    this.notificationService.showSuccess('Licencia añadida')
  }

  clearArray(){
    this.arrayPermissions=[]
  }

  goBack(){
    this._location.back();
  }

  getValue(value: string) {
    return this.userTypeEditForm.get(value)
  }
  getValueCreate(value: string) {
    return this.userTypeCreateForm.get(value)
  }

  resetForm(){
    this.userTypeCreateForm.reset()
  }

}
