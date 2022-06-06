import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { LicensesService } from '../../../services/licenses.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

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

  compLicences:any=[]

  companyEditForm: FormGroup;
  companyCreateForm: FormGroup;

  constructor(
    private companyService: CompanyService,
    private licensesService: LicensesService,
    private _location: Location,
    private router: Router,
    private notificationService: NotificationService,
    private fb: FormBuilder,
  ) {
    this.companyEditForm = this.fb.group({
      nameCompany: ['', Validators.required],
      typeCompany: [,Validators.required],
      addressCompany: [''],
      licencesArray: [[]]
    });

    this.companyCreateForm = this.fb.group({
      nameCompany: ['', Validators.required],
      typeCompany: [,Validators.required],
      addressCompany: [''],
      licencesArray: [[]]
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

  goBack(){
    this._location.back();
  }

  addLicence(licence: any) {
    let i = this.compLicences.indexOf(licence)
    console.log(i);
    if (i !== -1) {
      return this.notificationService.showErr('La licencia ya esta añadida')
    }
    this.compLicences.push(licence)
    this.notificationService.showSuccess('Licencia añadida')
    console.log(this.compLicences);
  }

  clearArray(){
    this.compLicences=[]
  }

  createCompany(){
    if (this.companyCreateForm.valid) {
      let value = this.companyCreateForm.value
      value.licencesArray=this.compLicences
      this.companyService.createCompany(value).subscribe(
        (data:any) => {
          this.getCompanys();
          jQuery("#createCompanyModal").modal("hide");
          Swal.fire({
            icon: 'success',
            title: 'Compañia creada correctamente',
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
      text: "¿Estas seguro que quieres eliminar la compañia?",
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
              title: 'Compañia eliminada correctamente',
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
    if (this.companyEditForm.valid) {
      let value = this.companyEditForm.value
      value.licencesArray=this.compLicences
      this.companyService.updateCompany(value, this.company._id).subscribe(
        (data:any) => {
          this.getCompanys();
          jQuery("#editCompanyModal").modal("hide");
          Swal.fire({
            icon: 'success',
            title: 'Compañia actualizada correctamente',
            showConfirmButton: false,
            timer: 2500
          })
          this.compLicences=[]
        },
        err => {}
      )
    }
  }

  getValue(value: string) {
    return this.companyEditForm.get(value)
  }
  getValueCreate(value: string) {
    return this.companyCreateForm.get(value)
  }

  redirect(){
    this.router.navigate([`/dashboard/superUser/companys/${this.company._id}/users`]);
  }
  redirectEdit(id:any){
    this.router.navigate([`dashboard/superUser/companys/edit/${id}`]);
  }
}
