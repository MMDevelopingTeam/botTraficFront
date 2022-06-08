import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatformsService } from '../../../services/platforms.service';
import Swal from 'sweetalert2'
import { Platform } from 'src/app/models/platform';

declare var jQuery:any;

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.scss']
})
export class PlatformsComponent implements OnInit {

  platforms: any;
  platform: any;
  
  platformEdit: Platform={
    namePlatform: '',
    urlPlatform: ''
  };

  platformCreateForm: FormGroup;
  
  constructor(
    private platformsService: PlatformsService,
    private _location: Location,
    private fb: FormBuilder,
  ) {

    this.platformCreateForm = this.fb.group({
      namePlatform: ['', Validators.required],
      urlPlatform: [''],
    });
  }

  ngOnInit(): void {
    this.getPlatforms();
  }

  getPlatforms(){
    this.platformsService.getPlatforms().subscribe(
      (data:any) => {
        this.platforms=data.dataPlatfm
      },
      err => {}
    )
  }

  getPlatform(platform: any){
    this.platform=platform
  }
  getPlatformEdit(platform: any){
    this.platformEdit=platform
  }

  deletePlatform(id:any){
    Swal.fire({
      title: 'Eliminar',
      text: "¿Estas seguro que quieres eliminar la plataforma?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.platformsService.deletePlatform(id).subscribe(
          (data:any) => {
            this.getPlatforms();
            Swal.fire({
              icon: 'success',
              title: 'Plataforma eliminada correctamente',
              showConfirmButton: false,
              timer: 2500
            })
          },
          err => {}
        )
      }
    })
  }

  UpdatePlatform() {
    this.platformsService.updatePlatform(this.platformEdit, this.platformEdit._id).subscribe(
      (data:any) => {
        this.getPlatforms();
        jQuery("#platformEditModal").modal("hide");
        Swal.fire({
          icon: 'success',
          title: 'Plataforma actualizada correctamente',
          showConfirmButton: false,
          timer: 2500
        })
      },
      err => {}
    )
  }
  createPlatform() {
    if (this.platformCreateForm.valid) {
      this.platformsService.createPlatform(this.platformCreateForm.value).subscribe(
        (data:any) => {
          this.getPlatforms();
          jQuery("#createModal").modal("hide");
          Swal.fire({
            icon: 'success',
            title: 'Plataforma creada correctamente',
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

  getValueCreate(value: string) {
    return this.platformCreateForm.get(value)
  }
}
