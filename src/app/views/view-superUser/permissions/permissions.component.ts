import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermissionsService } from 'src/app/services/permissions.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  permissions: any;
  permission: any;
  permissionsEditForm: FormGroup;
  permissionsCreateForm: FormGroup;

  constructor(
    private permissionsService: PermissionsService,
    private _location: Location,
    private fb: FormBuilder,
  ) {
    this.permissionsEditForm = this.fb.group({
      namePermission: ['', Validators.required],
      PermissionDescription: [''],
    });

    this.permissionsCreateForm = this.fb.group({
      namePermission: ['', Validators.required],
      PermissionDescription: [''],
    });
  }

  ngOnInit(): void {
    this.getPermissions();
  }

  getPermissions(){
    this.permissionsService.gePermissions().subscribe(
      (data:any) => {
        this.permissions=data.dataPermissions
      },
      err => {}
    )
  }

  goBack(){
    this._location.back();
  }

  createPermission(){
    if (this.permissionsCreateForm.valid) {
      this.permissionsService.createPermission(this.permissionsCreateForm.value).subscribe(
        (data:any) => {
          this.getPermissions();
          Swal.fire({
            icon: 'success',
            title: 'Permiso creado correctamente',
            showConfirmButton: false,
            timer: 2500
          })
        },
        err => {}
      )
    }
  }

  getPermission(permission: any){
    this.permission=permission
  }

  deletePermission(id:any){
    Swal.fire({
      title: 'Eliminar',
      text: "¿Estas seguro que quieres eliminar la permiso?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.permissionsService.deletePermission(id).subscribe(
          (data:any) => {
            this.getPermissions();
            Swal.fire({
              icon: 'success',
              title: 'Permiso eliminado correctamente',
              showConfirmButton: false,
              timer: 2500
            })
          },
          err => {}
        )
      }
    })
  }

  UpdatePermission(){
    if (this.permissionsEditForm.valid) {
      this.permissionsService.updatePermission(this.permissionsEditForm.value, this.permission._id).subscribe(
        (data:any) => {
          this.getPermissions();
          Swal.fire({
            icon: 'success',
            title: 'Compañia actualizada correctamente',
            showConfirmButton: false,
            timer: 2500
          })
        },
        err => {}
      )
    }
  }

  getValue(value: string) {
    return this.permissionsEditForm.get(value)
  }
  getValueCreate(value: string) {
    return this.permissionsCreateForm.get(value)
  }

}
