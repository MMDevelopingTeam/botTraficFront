import { Component, OnInit } from '@angular/core';
import { BotService } from 'src/app/services/bot.service';
import { ModelsService } from 'src/app/services/models.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { PlatformsService } from '../../../services/platforms.service';
import { NotificationService } from '../../../services/notification.service';
import { HeadquartersService } from '../../../services/headquarters.service';

declare var jQuery:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  usuario: any;

  registers:any;

  p:any;
  registersLength:any;

  dataModels: any;
  modelo: any;

  launchBotsForm: FormGroup
  killBotsForm: FormGroup

  nickname:any;

  modeloKillbot: any;
  lengthkillbots: any;
  platforms: any;
  isLoading: boolean = false;
  isLoadingBots: boolean = false;
  data$: any;
  idPlatfom: any;
  IfValid: boolean=false;
  idCompany: any;
  botContainers: any;
  botContainer: any;
  CompanyArrayBot: any;
  ipBot: any;

  constructor(
    public userService: UserService,
    public botService: BotService,
    public headquartersService: HeadquartersService,
    public modelsService: ModelsService,
    public platformsService: PlatformsService,
    public notificationService: NotificationService,
    private router: Router,
    public nav: NavbarService,
    private fb: FormBuilder,
    ) {
      this.launchBotsForm = this.fb.group({
        nameModel: [this.modelo],
        userId: [''],
        nBots: ['', Validators.required]
      });
      this.killBotsForm = this.fb.group({
        nameModel: [''],
        userId: [''],
        nBots: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
    this.isLoadingBots=true
    this.gets();
    this.nav.show();
    this.getInfoUrs();
  }

  gets(){
    this.getRegisters();
    this.getBotcontainersByIdComp();
  }

  getRegisters() {
    this.modelsService.getRegisters(localStorage.getItem('idUser')).subscribe(
      (data:any) => {
        this.registers=data.dataPlatfm
        this.registersLength=data.dataPlatfm.length
        // console.log(data);
      },
      err => {}
    )
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
        this.headquartersService.getHeadquarterById(this.usuario.headquarters_idHeadquarter).subscribe(
          (data:any) => {
            this.idCompany=data.dataHeadquarter.company_idCompany
          },
          err => {}
        )
      },
      (error) => console.log(error)
    );
  }

  getIdBotCLauch(ip:any, model:any) {
    jQuery("#launchBotModal").modal("show");
    this.ipBot=ip
    this.getModel(model)
  }
  getIdBotCKill(ip:any, model:any) {
    jQuery("#killBotModal").modal("show");
    this.ipBot=ip
    this.getModel(model)
  }

  getBotcontainersByIdComp() {
    setTimeout(() => {
      this.botService.getBotContainerByIdComp(this.idCompany).subscribe(
        (data:any) => {
          this.botContainers=data.botContainers
          this.isLoadingBots=false
        },
        err => {}
      )
    }, 1000);
  }

  getBotContainer(botCont:any){
    this.botContainer=botCont
    this.botContainer.CompnaysArray.map((data:any) => {
      if (data.id === this.idCompany) {
        this.CompanyArrayBot=data
      }
    })
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
    this.botService.getKillBotsByModel(this.ipBot, data).subscribe(
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
    this.botService.getKillBotsByModel(this.ipBot, data).subscribe(
      (data:any) => {
        this.lengthkillbots=data.acctsModelsLength
      },
      err => {}
    )
  }

  launchBots() {
    let value = this.launchBotsForm.value
    value.nameModel=this.modelo
    value.userId=this.usuario._id
    this.userService.getTokenBot(value).subscribe(
      (res: any) => {
        const info = {
          token: res.token
        }
        if (value.nBots > this.CompanyArrayBot.AcctsFree) {
          this.notificationService.showErr('El numero de bots no puede se mayor al permitido en el bot container')
        }
        this.botService.launchBot(this.ipBot, info).subscribe(
          (data:any) => {
            const body = {
              companys_idCompany: this.idCompany,
              nBots: value.nBots,
              Launch:true
            }
            this.botService.updateBotConatinerArrayComp(body, this.botContainer._id).subscribe(
              (data:any) => {
              },
              err => {}
            )
            this.modelsService.createRegister(value).subscribe(
              (data:any) => {
              },
              err => {}
            )
            setTimeout(() => {
              this.getRegisters();
            }, 500);
            this.gets();
            this.resetFormLaunch();
            jQuery("#launchBotModal").modal("hide");
            Swal.fire({
              icon: 'success',
              title: 'Bots lanzados correctamente',
              showConfirmButton: false,
              timer: 1500
            })
          },
          err => {}
        )
      },
      err => console.log(err)
    )
  }

  killBots() {
    let value = this.killBotsForm.value
    value.nameModel=this.modelo
    value.userId=this.usuario._id
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
        const info = {
          token: res.token
        }

        // if (value.nBots > this.CompanyArrayBot.AcctsFree) {
        //   this.notificationService.showErr('El numero de bots no puede se mayor al permitido en el bot container')
        // }

        this.botService.killBot('localhost', info).subscribe(
          (data:any) => {
            const dataV = {
              nameModel: value.nameModel,
              userId:value.userId,
              nBots:value.nBots,
              killBots: true
            }
            this.modelsService.createRegister(dataV).subscribe(
              (data:any) => {
              },
              err => {}
            )
            const body = {
              companys_idCompany: this.idCompany,
              nBots: value.nBots,
              Kill:true
            }
            this.botService.updateBotConatinerArrayComp(body, this.botContainer._id).subscribe(
              (data:any) => {
              },
              err => {}
            )
            setTimeout(() => {
              this.getRegisters();
            }, 500);
            this.gets();
            this.resetFormKill();
            jQuery("#killBotModal").modal("hide");
            Swal.fire({
              icon: 'success',
              title: 'Bots kill correctamente',
              showConfirmButton: false,
              timer: 1500
            })
          },
          err => console.log(err)
        )
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

  resetFormLaunch(){
    this.launchBotsForm.reset()
  }
  resetFormKill(){
    this.killBotsForm.reset()
  }

}
