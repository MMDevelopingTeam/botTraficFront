import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Permission } from 'src/app/models/permission';
import { PermissionsService } from 'src/app/services/permissions.service';
import Swal from 'sweetalert2'

declare var jQuery:any;

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  permissions: any;
  permission: any;

  permissionEdit: Permission= {
    namePermission: '',
    PermissionDescription: ''
  };

  permissionsCreateForm: FormGroup;

  constructor(
    private permissionsService: PermissionsService,
    private _location: Location,
    private fb: FormBuilder,
  ) {
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
  getPermissionEdit(permission: any){
    this.permissionEdit=permission
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
    this.permissionsService.updatePermission(this.permissionEdit, this.permissionEdit._id).subscribe(
      (data:any) => {
        this.getPermissions();
        jQuery("#permissionEditModal").modal("hide");
        Swal.fire({
          icon: 'success',
          title: 'Permiso actualizado correctamente',
          showConfirmButton: false,
          timer: 2500
        })
      },
      err => {}
    )
  }
  getValueCreate(value: string) {
    return this.permissionsCreateForm.get(value)
  }

}
