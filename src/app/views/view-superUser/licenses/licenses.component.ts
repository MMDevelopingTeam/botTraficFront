import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LicensesService } from '../../../services/licenses.service';
import Swal from 'sweetalert2'
import { PlatformsService } from '../../../services/platforms.service';
import { License } from '../../../models/license';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss']
})
export class LicensesComponent implements OnInit {
  licencesCreateForm: FormGroup;
  licenses: any;
  license: any;
  platforms: any;

  licenseEdit: License = {
    nameLicense: '',
    descriptionLicense: '',
    monthsDuration: '',
    platform_idPlatform: '',
    numberAccts: '',
  };

  constructor(
    private licensesService: LicensesService,
    private PlatformsService: PlatformsService,
    private _location: Location,
    private fb: FormBuilder,
  ) {
    this.licencesCreateForm = this.fb.group({
      nameLicense: ['', Validators.required],
      descriptionLicense: [''],
      monthsDuration: ['', Validators.required],
      platform_idPlatform: ['', Validators.required],
      numberAccts: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getLicenses();
    this.getPlatforms();
  }
  
  getLicenses(){
    this.licensesService.geLicenses().subscribe(
      (data:any) => {
        console.log(data.dataLicenses);
        this.licenses=data.dataLicenses
      },
      err => {}
    )
  }

  getPlatforms(){
    this.PlatformsService.getPlatforms().subscribe(
      (data:any) => {
        this.platforms=data.dataPlatfm
      },
      err => {}
    )
  }

  goBack(){
    this._location.back();
  }

  createLicense(){
    if (this.licencesCreateForm.valid) {
      this.licensesService.createLicense(this.licencesCreateForm.value).subscribe(
        (data:any) => {
          this.getLicenses();
          Swal.fire({
            icon: 'success',
            title: 'Licencia creada correctamente',
            showConfirmButton: false,
            timer: 2500
          })
        },
        err => {}
      )
    }
  }

  getLicense(license: any){
    this.license=license
    console.log(this.license);
  }

  getLicenseEdit(license: License){
    this.licenseEdit=license
  }

  deleteLicense(id:any){
    Swal.fire({
      title: 'Eliminar',
      text: "¿Estas seguro que quieres eliminar la licencia?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.licensesService.deleteLicense(id).subscribe(
          (data:any) => {
            this.getLicenses();
            Swal.fire({
              icon: 'success',
              title: 'Licencia eliminada correctamente',
              showConfirmButton: false,
              timer: 2500
            })
          },
          err => {}
        )
      }
    })
  }

  UpdateLicense(){
    console.log("this.licencesEditForm.value");
    this.licensesService.updateLicense(this.licenseEdit, this.licenseEdit._id).subscribe(
      (data:any) => {
        this.getLicenses();
        Swal.fire({
          icon: 'success',
          title: 'Licencia actualizada correctamente',
          showConfirmButton: false,
          timer: 2500
        })
      },
      err => {}
    )
  }

  // getValue(value: string) {
  //   return this.licencesEditForm.get(value)
  // }
  getValueCreate(value: string) {
    return this.licencesCreateForm.get(value)
  }

}
