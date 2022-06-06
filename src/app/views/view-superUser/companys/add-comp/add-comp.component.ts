import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { BotService } from '../../../../services/bot.service';
import { NotificationService } from '../../../../services/notification.service';
import { CompanyService } from 'src/app/services/company.service';
import { LicensesService } from '../../../../services/licenses.service';
import Swal from 'sweetalert2'
import { Compnay } from 'src/app/models/company';

declare var jQuery:any;

@Component({
  selector: 'app-add-comp',
  templateUrl: './add-comp.component.html',
  styleUrls: ['./add-comp.component.scss']
})
export class AddCompComponent implements OnInit {
  id: any;
  url: any;
  edit: any;
  botContainers: any;
  licences: any;
  idCompany: any;
  
  arraybotContainers:any=[]
  arraybotContainersFinshed:any=[]
  arrayLicences:any=[]
  arrayLicencesFinshed:any=[]

  companyEditArraysForm: FormGroup;
  registerLicensesCreateForm: FormGroup;
  companyCreateForm: FormGroup;
  
  /////////////////
  ////  edit  /////
  /////////////////
  
  company: Compnay = {
    nameCompany: '',
    typeCompany: '',
    addressCompany: '',
    telephoneCompany: '',
    logo: '',
    registerLicensesArray: [],
    botContainerArray: []
  };

  lista:string[]=["hola","que","tal", "estas"];
  seleccionados:string[]=[];

  constructor(
    private route: ActivatedRoute,
    private botService: BotService,
    private notificationService: NotificationService,
    private companyService: CompanyService,
    private licensesService: LicensesService,
    private router: Router,
    private fb: FormBuilder,
    private _location: Location,
  ) {
    this.route.params.subscribe(params => {
      this.id=params.id;
    });

    this.companyCreateForm = this.fb.group({
      nameCompany: ['', Validators.required],
      typeCompany: [,Validators.required],
      addressCompany: [''],
      telephoneCompany: [''],
      logo: [''],
      registerLicensesArray: [[]],
      botContainerArray: [[]]
    });
    
    this.companyEditArraysForm = this.fb.group({
      registerLicensesArray: [[]],
      botContainerArray: [[]]
    });

    this.registerLicensesCreateForm = this.fb.group({
      initialDateLicense: ['', Validators.required],
      monthsDuration: ['', Validators.required],
      licenses_idLicense: ['', Validators.required],
      companys_idCompany: ['']
    });
  }

  ngOnInit(): void {
    this.url=this.router.url.split('/').pop()
    if (this.url === 'add') {
      this.edit=false
    }else{
      this.edit=true
      this.route.params.subscribe(params => {
        this.id=params.id;
        this.companyService.getCompanyById(this.id).subscribe(
          (data:any) => {
            this.company=data.dataCompany
          },
          err => {}
        )
      });
    }
    this.getBotContainers();
    this.getLicenses();
  }

  goBack(){
    this._location.back();
  }

  getBotContainers(){
   this.botService.getBotContainers().subscribe(
     (data:any) => {
      this.botContainers=data.dataBotContainer
     },
     err => {}
   )
  }
  getLicenses(){
   this.licensesService.geLicenses().subscribe(
     (data:any) => {
      this.licences=data.dataLicenses
     },
     err => {}
   )
  }

  addBotContainer(botContainers:any){
    let i = this.arraybotContainers.indexOf(botContainers)
    if (i !== -1) {
      return this.notificationService.showErr('El botContainer ya esta añadida')
    }
    this.arraybotContainers.push(botContainers)
    this.notificationService.showSuccess('BotContainers añadida')
  }

  deleteBotContainer(botContainer:any){
    let i = this.arraybotContainers.indexOf(botContainer)
    console.log(i);
    if (i !== -1) {
      this.arraybotContainers.splice(i, 1)
    }
    console.log(this.arraybotContainers);
    this.arraybotContainersFinshed=[]
  }

  createCompany(){
    if (this.companyCreateForm.valid) {
      let value = this.companyCreateForm.value
      this.companyService.createCompany(value).subscribe(
        (data:any) => {
          // this.goBack()
          this.idCompany=data.newComp._id
          jQuery("#staticBackdrop").modal("show");
        },
        err => {}
      )
    }
  }

  createRegisterLiceses(){
    if (this.registerLicensesCreateForm.valid) {
      let value = this.registerLicensesCreateForm.value
      value.companys_idCompany=this.idCompany || this.id
      this.licensesService.createRegisterLicense(value).subscribe(
        (data:any) => {
          this.arrayLicences.push(data.licence)
          this.notificationService.showSuccess('Suscripción creada correctamente')
          if (this.edit) {
            jQuery("#createLicenseModal").modal("hide");
          }
        },
        err => {}
      )
    }
  }

  updateCompany(){
    this.companyService.updateCompany(this.company, this.id).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Compañia Actualizada correctamente',
          showConfirmButton: false,
          timer: 2000
        })
        this.goBack();
      },
      err => {}
    )
  }

  updateArraysCompany(){
    if (this.arraybotContainers.length <= 0) {
      return this.notificationService.showErr('Agrega almenos un contenedor de bot')
    }
    this.arraybotContainersFinshed=[]
    this.arrayLicencesFinshed=[]
    this.arraybotContainers.map(
      (data:any) => {
        this.arraybotContainersFinshed.push(data._id)
      }
    )
    let value = this.companyEditArraysForm.value
    value.botContainerArray=this.arraybotContainersFinshed
    this.companyService.updateCompany(value, this.idCompany).subscribe(
      (data:any) => {
        jQuery("#staticBackdrop").modal("hide");
          Swal.fire({
            icon: 'success',
            title: 'Compañia creada correctamente',
            showConfirmButton: false,
            timer: 2500
          })
          this.goBack();
      },
      err => {}
    )
  }

  updateBotContainers(id:any){
    let botConArray=[]
    let value = this.companyEditArraysForm.value
    botConArray.push(id)
    value.botContainerArray=botConArray
    this.companyService.updateCompany(value, this.id).subscribe(
      (data: any) => {
        this.notificationService.showSuccess('BotContainer añadido correctamente')
      },
      err => {}
    )
  }

  getValue(value: string) {
    // return this.companyEditForm.get(value)
  }
  getValueCreate(value: string) {
    return this.companyCreateForm.get(value)
  }
  getValueCreateRegisterLicenses(value: string) {
    return this.registerLicensesCreateForm.get(value)
  }

}
