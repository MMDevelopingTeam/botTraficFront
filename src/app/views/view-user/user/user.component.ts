import { Component, OnInit } from '@angular/core';
import { BotService } from 'src/app/services/bot.service';
import { ModelsService } from 'src/app/services/models.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { PlatformsService } from '../../../services/platforms.service';
import { finalize, map } from 'rxjs/operators';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  usuario: any;

  dataModels: any;
  modelo: any;

  launchBotsForm: FormGroup
  killBotsForm: FormGroup

  nickname:any;

  modeloKillbot: any;
  lengthkillbots: any;
  platforms: any;
  isLoading: boolean = false;
  data$: any;
  idPlatfom: any;
  IfValid: boolean=false;

  constructor(
    public userService: UserService,
    public botService: BotService,
    public modelsService: ModelsService,
    public platformsService: PlatformsService,
    public notificationService: NotificationService,
    private router: Router,
    public nav: NavbarService,
    private fb: FormBuilder,
    ) {
      this.launchBotsForm = this.fb.group({
        nameModel: [this.modelo],
        userId: [localStorage.getItem('idUser')],
        nBots: ['', [Validators.min(10), Validators.required]]
      });
      this.killBotsForm = this.fb.group({
        nameModel: [''],
        userId: [localStorage.getItem('idUser')],
        nBots: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
    this.nav.show();
    this.getInfoUrs()
  }

  getInfoUrs() {
    this.userService.getInfoUser().subscribe(
      (data: any) => {
        this.usuario = data.dataUser;
        for (const iterator of this.usuario.userTypeArray) {
          if (iterator.nameUserType === 'moderator') {
            this.modelsService.getModelsByIDheadQ(this.usuario.headquarters_idHeadquarter).subscribe(
              (data:any) => {
                // console.log(data)
                this.dataModels=data.dataModel
              },
              err => console.log(err)
            )
            this.getPlatforms()
            this.IfValid=true
          }
        }
      },
      (error) => console.log(error)
    );
  }

  getPlatforms() {
    this.platformsService.getPlatforms().subscribe(
      (data: any) => {
        this.platforms=data.dataPlatfm
      }
    )
  }

  getIdPlatform(id:any){
    this.idPlatfom=id
  }

  searchModel() {
    this.data$=null
    if (!this.idPlatfom || this.idPlatfom === 'Seleccione la plataforma') {
      this.notificationService.showErr('Seleccione una plataforma')
      return;
    }
    if (!this.nickname) {
      this.notificationService.showErr('Escribe el nickname de la modelo')
      return;
    }
    this.isLoading=true;
    this.modelsService.getModelByIDPlatform(this.nickname, this.idPlatfom).subscribe(
      (data:any) => {
        this.data$=data.dataModel
        this.notificationService.showSuccess('Modelo encotrada')
        this.isLoading=false
      },
      err => this.isLoading=false
    )
  }

  dataModelKillbot(model: any) {
    this.modeloKillbot=model
    const data = {
      nameModel: model
    }
    this.botService.getKillBotsByModel(data).subscribe(
      (data:any) => {
        console.log(data)
        this.lengthkillbots=data.acctsModelsLength
      },
      err => {}
    )
  }

  getModel(model:any){
    this.modelo=model
    this.lengthkillbots=null
    const data={
      nameModel: model
    }
    this.botService.getKillBotsByModel(data).subscribe(
      (data:any) => {
        this.lengthkillbots=data.acctsModelsLength
      },
      err => {}
    )
  }

  launchBots() {
    let value = this.launchBotsForm.value
    value.nameModel=this.modelo
    this.userService.getTokenBot(value).subscribe(
      (res: any) => {
        // const info = {
        //   token: res.token
        // }
        // console.log(res);
        if (res.message === 'bot corriendo') {
          Swal.fire({
            icon: 'success',
            title: 'Bots lanzados correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        }
        // this.botService.launchBot('localhost', info).subscribe(
        //   (data:any) => {
        //     console.log(data)
        //     Swal.fire({
        //       icon: 'success',
        //       title: 'Bots lanzados correctamente',
        //       showConfirmButton: false,
        //       timer: 1500
        //     })
        //   },
        //   err => {}
        // )
      },
      err => console.log(err)
    )
  }

  killBots() {
    let value = this.killBotsForm.value
    value.nameModel=this.modelo
    if (value.nBots > this.lengthkillbots) {
      Swal.fire({
        icon: 'warning',
        title: 'El numéro de killBots no puede ser mayor al numero de bots corriendo',
        showConfirmButton: false,
        timer: 3500
      })
      return;
    }
    this.userService.getTokenkillBot(value).subscribe(
      (res: any) => {
        // const info = {
        //   token: res.token
        // }



        // this.botService.killBot('localhost', info).subscribe(
        //   (data:any) => {
        //     console.log(data)
        //     Swal.fire({
        //       icon: 'success',
        //       title: 'Bots kill correctamente',
        //       showConfirmButton: false,
        //       timer: 1500
        //     })
        //   },
        //   err => console.log(err)
        // )
      },
      err => console.log(err)
    )
  }

  getValue(value: string) {
    return this.launchBotsForm.get(value)
  }
  getValueKillbot(value: string) {
    return this.killBotsForm.get(value)
  }

}
