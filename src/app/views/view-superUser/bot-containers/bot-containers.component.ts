import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BotService } from '../../../services/bot.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-bot-containers',
  templateUrl: './bot-containers.component.html',
  styleUrls: ['./bot-containers.component.scss']
})
export class BotContainersComponent implements OnInit {
  botContainerEditForm: FormGroup;
  botContainerCreateForm: FormGroup;

  botContainers: any
  botContainer: any

  lengthProxys: any;
  lengthProxysFree: any;
  valueProxys: any;

  lengthAccts: any;
  lengthAcctsFree: any;
  valueAccts: any;

  constructor(
    private botService: BotService,
    private _location: Location,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.botContainerEditForm = this.fb.group({
      ip: ['', Validators.required],
      typeBot: ['', Validators.required],
      descriptionBot: [''],
      latBot: [''],
      lonBot: [''],
      addressBot: [''],
      averageDownloadSpeed: [''],
      averageUploadSpeed: [''],
      isp: ['']
    });

    this.botContainerCreateForm = this.fb.group({
      ip: ['', Validators.required],
      typeBot: ['', Validators.required],
      descriptionBot: [''],
      latBot: [''],
      lonBot: [''],
      addressBot: [''],
      averageDownloadSpeed: [''],
      averageUploadSpeed: [''],
      isp: ['']
    });
  }

  ngOnInit(): void {
    this.getBotContainers()
  }

  getBotContainers(){
    this.botService.getBotContainers().subscribe(
      (data:any) => {
        this.botContainers=data.dataBotContainer
      },
      err => {}
    )
  }

  getAllAccts(){
    this.botService.getAllAccts(this.botContainer.ip).subscribe(
      (data:any) => {
        this.lengthAccts=data.acctsModelslength
        this.botService.getAllAcctsFree(this.botContainer.ip).subscribe(
          (data:any) => {
            this.lengthAcctsFree=data.acctsModels
            let acctsUserd = this.lengthAccts-this.lengthAcctsFree
            let value = (100*acctsUserd)/this.lengthAccts
            return this.valueAccts=value
          },
          err => {}
        )
      },
      err => {}
    )
  }
  getAllProxys(){
    this.botService.getAllProxys(this.botContainer.ip).subscribe(
      (data:any) => {
        this.lengthProxys=data.prsModelsLength
        this.botService.getAllProxysFree(this.botContainer.ip).subscribe(
          (data:any) => {
            this.lengthProxysFree=data.prsModelsLength
            let proxysUserd = this.lengthProxys-this.lengthProxysFree
            let value = (100*proxysUserd)/this.lengthProxys
            return this.valueProxys=value
          },
          err => {}
        )
      },
      err => {}
    )
  }

  getBotContainer(botContainer: any){
    this.botContainer=botContainer
    this.getAllAccts()
    this.getAllProxys()
  }

  deleteBotContainer(id:any){
    Swal.fire({
      title: 'Eliminar',
      text: "¿Estas seguro que quieres eliminar el contenedor de bot?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.botService.deleteBotContainer(id).subscribe(
          (data:any) => {
            this.getBotContainers();
            Swal.fire({
              icon: 'success',
              title: 'Contenedor de bot eliminado correctamente',
              showConfirmButton: false,
              timer: 2500
            })
          },
          err => {}
        )
      }
    })
  }

  UpdateBotContainer() {
    if (this.botContainerEditForm.valid) {
      this.botService.updateBotContainer(this.botContainerEditForm.value, this.botContainer._id).subscribe(
        (data:any) => {
          this.getBotContainers();
          Swal.fire({
            icon: 'success',
            title: 'Contenedor de bot actualizado correctamente',
            showConfirmButton: false,
            timer: 2500
          })
        },
        err => {}
      )
    }
  }

  createBotContainer() {
    if (this.botContainerCreateForm.valid) {
      this.botService.createBotContainer(this.botContainerCreateForm.value).subscribe(
        (data:any) => {
          this.getBotContainers();
          Swal.fire({
            icon: 'success',
            title: 'Contenedor de bot actualizado creada correctamente',
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

  redirect(id:any){
    this.router.navigate([`/dashboard/superUser/botContainers/${id}/proxys`]);
  }

  getValue(value: string) {
    return this.botContainerEditForm.get(value)
  }
  getValueCreate(value: string) {
    return this.botContainerCreateForm.get(value)
  }

}
