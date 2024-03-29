import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BotService } from '../../../services/bot.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { Botcontainer } from 'src/app/models/botcontainer';
import { UserService } from 'src/app/services/user.service';

declare var jQuery:any;

@Component({
  selector: 'app-bot-containers',
  templateUrl: './bot-containers.component.html',
  styleUrls: ['./bot-containers.component.scss']
})
export class BotContainersComponent implements OnInit {
  botContainerCreateForm: FormGroup;
  CreateActsForm: FormGroup;

  botContainers: any
  botContainer: any

  p:any;
  BotContainersLength:any;

  botContainerEdit: Botcontainer= {
    ip: '',
    typeBot: '',
    descriptionBot: '',
    latBot: '',
    lonBot: '',
    addressBot: '',
    averageDownloadSpeed: '',
    averageUploadSpeed: '',
    isp: ''
  }

  ipBot: any;

  isloading:boolean=false;

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
    private userService: UserService,
  ) {

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

    this.CreateActsForm = this.fb.group({
      nInt: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.userService.tokenValidSuperU()
    this.getBotContainers()
  }

  getBotContainers(){
    this.botService.getBotContainers().subscribe(
      (data:any) => {
        this.botContainers=data.dataBotContainer
        // console.log(this.botContainers);
        this.BotContainersLength=data.dataBotContainer.length
      },
      err => {}
    )
  }

  getIpBotCreateActs(ip: string){
    this.ipBot=ip
  }

  createActsBot(){
    if (this.CreateActsForm.valid) {
      this.botService.createActs(this.ipBot, this.CreateActsForm.value).subscribe(
        (data: any) => {
          console.log(data);
        }
      )
      jQuery("#addActsBot").modal("hide");
      Swal.fire({
        icon: 'success',
        title: 'El proceso de creación de cuentas inicio correctamente',
        showConfirmButton: false,
        timer: 2500
      })
    }
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

  getBotContainerEdit(botContainer:Botcontainer){
    this.botContainerEdit=botContainer
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
    this.botService.updateBotContainer(this.botContainerEdit, this.botContainerEdit._id).subscribe(
      (data:any) => {
        this.getBotContainers();
        jQuery("#botContainerEditModal").modal("hide");
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

  createBotContainer() {
    if (this.botContainerCreateForm.valid) {
      this.isloading=true
      this.botService.createBotContainer(this.botContainerCreateForm.value).subscribe(
        (data:any) => {
          this.getBotContainers();
          this.isloading=false
          this.resetForm();
          jQuery("#createBotContainerModal").modal("hide");
          Swal.fire({
            icon: 'success',
            title: 'Contenedor de bot actualizado creada correctamente',
            showConfirmButton: false,
            timer: 2500
          })
        },
        err => {
          this.isloading=false
        }
      )
    }
  }

  goBack(){
    this._location.back();
  }

  redirect(id:any){
    this.router.navigate([`/dashboard/superUser/botContainers/${id}/proxys`]);
  }

  getValueCreate(value: string) {
    return this.botContainerCreateForm.get(value)
  }

  resetForm(){
    this.botContainerCreateForm.reset()
  }
  getValueCreateActs(value: string) {
    return this.CreateActsForm.get(value)
  }

  resetCreateActsForm(){
    this.CreateActsForm.reset()
  }

}
