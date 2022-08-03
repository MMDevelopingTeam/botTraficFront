import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { LicensesService } from '../../../services/licenses.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';

declare var jQuery:any;

@Component({
  selector: 'app-companys',
  templateUrl: './companys.component.html',
  styleUrls: ['./companys.component.scss']
})
export class CompanysComponent implements OnInit {
  companys: any;
  company: any;
  licences: any;

  p:any;
  companysLength:any;

  companyCreateForm: FormGroup;
  addLicenceForm: FormGroup;

  companyEdit: Company = {
    nameCompany: '',
    typeCompany: '',
    addressCompany: '',
    telephoneCompany: ''
  }

  constructor(
    private companyService: CompanyService,
    private licensesService: LicensesService,
    private _location: Location,
    private router: Router,
    private notificationService: NotificationService,
    private fb: FormBuilder,
  ) {

    this.companyCreateForm = this.fb.group({
      nameCompany: ['', Validators.required],
      typeCompany: [,Validators.required],
      addressCompany: [''],
      telephoneCompany: [''],
      license_idLicense: ['', Validators.required]
    });

    this.addLicenceForm = this.fb.group({
      initialDateLicense: ['', Validators.required],
      companys_idCompany: [''],
      licenses_idLicense: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCompanys()
    this.getLicences()
  }

  getCompanys(){
    this.companyService.geCompanys().subscribe(
      (data:any) => {
        this.companys=data.dataCompany
        this.companysLength=data.dataCompany.length
      },
      err => {}
    )
  }

  getLicences(){
    this.licensesService.geLicenses().subscribe(
      (data: any) => {
        this.licences=data.dataLicenses
      }
    )
  }

  getCompany(company:any){
    this.company=company
  }

  getCompanyEdit(company: Company){
    this.companyEdit=company
  }

  goBack(){
    this._location.back();
  }

  createCompany(){
    if (this.companyCreateForm.valid) {
      this.companyService.createCompany(this.companyCreateForm.value).subscribe(
        (data:any) => {
          this.getCompanys();
          this.resetFormCreate();
          jQuery("#createModal").modal("hide");
          Swal.fire({
            icon: 'success',
            title: 'Compañía creada correctamente',
            showConfirmButton: false,
            timer: 2500
          })
        },
        err => {}
      )
    }
  }

  deleteCompany(id:any){
    Swal.fire({
      title: 'Eliminar',
      text: "¿Estas seguro que quieres eliminar la compañía?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.companyService.deleteCompany(id).subscribe(
          (data:any) => {
            this.getCompanys();
            Swal.fire({
              icon: 'success',
              title: 'Compañía eliminada correctamente',
              showConfirmButton: false,
              timer: 2500
            })
          },
          err => {}
        )
      }
    })
  }

  UpdateCompany(){
    this.companyService.updateCompany(this.companyEdit, this.companyEdit._id).subscribe(
      (data:any) => {
        this.getCompanys();
        jQuery("#editCompanyModal").modal("hide");
        Swal.fire({
          icon: 'success',
          title: 'Compañía actualizada correctamente',
          showConfirmButton: false,
          timer: 2500
        })
      },
      err => {}
    )
  }

  getValueCreate(value: string) {
    return this.companyCreateForm.get(value)
  }

  redirect(){
    this.router.navigate([`/dashboard/superUser/companys/${this.company._id}/users`]);
  }

  resetFormCreate(){
    this.companyCreateForm.reset()
  }
  resetFormAddLicence(){
    this.addLicenceForm.reset()
  }

  addLicence(){
    let value = this.addLicenceForm.value
    value.companys_idCompany=this.company._id
    this.licensesService.createRegisterLicense(value).subscribe(
      (data: any) => {
        this.getCompanys()
        jQuery("#addLicenceModal").modal("hide");
        this.resetFormAddLicence();
        Swal.fire({
          icon: 'success',
          title: 'Licencia añadida correctamente',
          showConfirmButton: false,
          timer: 2500
        })
      },
      err => {}
    )
  }

  disableLicence(id: any){
    Swal.fire({
      title: 'Desvincular licencia',
      text: "¿Esta seguro de realizar esta acción?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Desvincular',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.licensesService.desactiveRegisterLicence(id).subscribe(
          (data:any) => {
            this.getCompanys();
            jQuery("#addLicenceModal").modal("hide");
            Swal.fire({
              icon: 'success',
              title: 'Licencia desvinculada correctamente',
              showConfirmButton: false,
              timer: 2500
            })
          }
        )
      }
    })

  }
}
