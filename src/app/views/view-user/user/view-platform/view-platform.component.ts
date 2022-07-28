import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BotService } from 'src/app/services/bot.service';
import { HeadquartersService } from 'src/app/services/headquarters.service';
import { LicensesService } from 'src/app/services/licenses.service';
import { ModelsService } from 'src/app/services/models.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PlatformsService } from 'src/app/services/platforms.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare var jQuery:any;

@Component({
  selector: 'app-view-platform',
  templateUrl: './view-platform.component.html',
  styleUrls: ['./view-platform.component.scss']
})
export class ViewPlatformComponent implements OnInit {

  launchBotsForm: FormGroup
  killBotsForm: FormGroup
  
  p:any;

  platforms: any;
  modelo: any;
  lengthkillbots: any;
  data$: any;
  nickname: any;
  isLoading: boolean = false;
  modeloKillbot: any;
  idPlatform: any;

  licences: any;
  licenceSelect: any; 

  usuario: any;

  idCompany: any;
  dataLicences: any;
  
  registers: any;
  registersLength: any;
  idRegisterCompBotC: any;

  constructor( 
    private router: Router,
    public nav: NavbarService,
    private fb: FormBuilder,
    public botService: BotService,
    public notificationService: NotificationService,
    public userService: UserService,
    private _location: Location,
    public licensesService: LicensesService,
    public headquartersService: HeadquartersService,
    public platformsService: PlatformsService,
    public modelsService: ModelsService,
  ) {
    this.launchBotsForm = this.fb.group({
      nameModel: [''],
      userId: [''],
      nBots: ['', Validators.required],
      idRegisterCompBotContainer: ['']
    });
    this.killBotsForm = this.fb.group({
      nameModel: [''],
      userId: [''],
      nBots: ['', [Validators.required]],
      idRegisterCompBotContainer: ['']
    });
  }

  urlPlatform: any;

  ngOnInit(): void {
    this.nav.show();
    let urlInit = this.router.url.split('/')
    this.urlPlatform=urlInit.pop()
    this.platformsService.getPlatformByName(this.urlPlatform).subscribe(
      (data:any) => {
        this.idPlatform=data.dataPlatfm._id
      }
      )
    this.getInfoUrs();
    this.getRegisters();
  }

  getInfoUrs() {
    this.userService.getInfoUser().subscribe(
      (data: any) => {
        this.usuario = data.dataUser;
        this.headquartersService.getHeadquarterById(this.usuario.headquarters_idHeadquarter).subscribe(
          (data:any) => {
            this.idCompany=data.dataHeadquarter.company_idCompany
            this.getlicences();
          },
          err => {}
        )
      },
      (error) => console.log(error)
    );
  }

  getlicences() {
    const data = {
      companys_idCompany: this.idCompany,
      platforms_idPlatform: this.idPlatform
    }
    this.licensesService.getLicencesCompanyPlatform(data).subscribe(
      (data: any) => {
        this.licences=data.licencesArray
      }
    )
  }

  onChange(id:any) {
    if (id.target.value === 'Selecciona un tipo') {
      return this.notificationService.showErr('Selecciona un tipo')
    }
    this.idRegisterCompBotC=id.target.value
    this.getRegisterCompBotC(this.idRegisterCompBotC);
  }

  getRegisterCompBotC(id:any) {
    this.botService.getRegisterCompanyBotContainer(id).subscribe(
      (data:any) => {
        this.dataLicences=data.data
        console.log(this.dataLicences);
      }
    )
  }

  searchModel() {
    if (!this.nickname) {
      this.notificationService.showErr('Escribe el nickname de la modelo')
      return;
    }
    this.data$=null
    this.isLoading=true;
    let data = {
      nickname: this.nickname,
      platforms_idPlatform: this.idPlatform, 
      headquarters_idHeadquarter: this.usuario.headquarters_idHeadquarter
    }
    this.modelsService.getModelFull(data).subscribe(
      (data:any) => {
        
        this.data$=data.dataModel
        this.modelo=data.dataModel.nickname
        this.notificationService.showSuccess('Modelo encotrada')
        this.isLoading=false
      },
      err => this.isLoading=false
    )
  }

  switchBots(type: string){
    if (type === 'launch' && this.dataLicences.registerLicenses.licenses_idLicense.type === 'actsLogued') {
      this.launchBots()
    }
    if (type === 'kill' && this.dataLicences.registerLicenses.licenses_idLicense.type === 'actsLogued') {
      this.killBots()
    }
    if (type === 'launch' && this.dataLicences.registerLicenses.licenses_idLicense.type === 'actsAny') {
      this.launchBotsAny()
    }
    if (type === 'kill' && this.dataLicences.registerLicenses.licenses_idLicense.type === 'actsAny') {
      this.killBotsAny()
    }
    if (type === 'launch' && this.dataLicences.registerLicenses.licenses_idLicense.type === 'actsMixed') {
      this.launchBotsMixed()
    }
    if (type === 'kill' && this.dataLicences.registerLicenses.licenses_idLicense.type === 'actsMixed') {
      this.killBotsMixed()
    }
  }

  launchBots() {
    let value = this.launchBotsForm.value
    value.nameModel=this.modelo
    value.userId=this.usuario._id
    value.idRegisterCompBotContainer=this.dataLicences._id
    // console.log(value);
    if (value.nBots < 10) {
      return this.notificationService.showErr('El numero de bots debe ser mayor o igual a 10')
    }
    this.userService.getTokenBot(value).subscribe(
      (res: any) => {
        const info = {
          token: res.token
        }
        if (value.nBots > this.dataLicences) {
          return this.notificationService.showErr('El numero de bots no puede se mayor al permitido en el bot container')
        }
        this.botService.launchBot(this.dataLicences.botContainer_idBotContainer.ip, info).subscribe(
          (data:any) => {
            const body = {
              nBots: value.nBots,
              Launch:true
            }
            this.botService.updateBotConatinerArrayComp(body, this.dataLicences._id).subscribe(
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
              this.getRegisterCompBotC(this.idRegisterCompBotC);
            }, 1000);
            this.resetFormLaunch();
            jQuery("#launchBotsmodal").modal("hide");
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
    value.idRegisterCompBotContainer=this.dataLicences._id
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
        if ((value.nBots+this.dataLicences.AcctsFree) > this.dataLicences.AcctsUsed) {
          return this.notificationService.showErr('No es posible matar mas cuentas en el bot container')
        }
        this.botService.killBot(this.dataLicences.botContainer_idBotContainer.ip, info).subscribe(
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
              nBots: value.nBots,
              Kill:true
            }
            this.botService.updateBotConatinerArrayComp(body, this.dataLicences._id).subscribe(
              (data:any) => {
              },
              err => {}
            )
            setTimeout(() => {
              this.getRegisters();
              this.getRegisterCompBotC(this.idRegisterCompBotC);
            }, 1000);
            this.resetFormKill();
            jQuery("#killbotsModal").modal("hide");
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

  launchBotsAny() {
    let value = this.launchBotsForm.value
    value.nameModel=this.modelo
    value.userId=this.usuario._id
    value.idRegisterCompBotContainer=this.dataLicences._id
    // console.log(value);
    if (value.nBots < 10) {
      return this.notificationService.showErr('El numero de bots debe ser mayor o igual a 10')
    }
    this.userService.getTokenBotAny(value).subscribe(
      (res: any) => {
        const info = {
          token: res.token
        }
        if (value.nBots > this.dataLicences.AcctsFree) {
          return this.notificationService.showErr('El numero de bots no puede se mayor al permitido en el bot container')
        }
        this.botService.launchBotAny(this.dataLicences.botContainer_idBotContainer.ip, info).subscribe(
          (data:any) => {
            const body = {
              nBots: value.nBots,
              Launch:true
            }
            this.botService.updateBotConatinerArrayComp(body, this.dataLicences._id).subscribe(
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
              this.getRegisterCompBotC(this.idRegisterCompBotC);
            }, 1000);
            this.resetFormLaunch();
            jQuery("#launchBotsmodal").modal("hide");
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

  killBotsAny() {
    let value = this.killBotsForm.value
    value.nameModel=this.modelo
    value.userId=this.usuario._id
    value.idRegisterCompBotContainer=this.dataLicences._id
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
        if ((value.nBots+this.dataLicences.AcctsFree) > this.dataLicences.AcctsUsed) {
          return this.notificationService.showErr('No es posible matar mas cuentas en el bot container')
        }
        this.botService.killBotAny(this.dataLicences.botContainer_idBotContainer.ip, info).subscribe(
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
              nBots: value.nBots,
              Kill:true
            }
            this.botService.updateBotConatinerArrayComp(body, this.dataLicences._id).subscribe(
              (data:any) => {
              },
              err => {}
            )
            setTimeout(() => {
              this.getRegisters();
              this.getRegisterCompBotC(this.idRegisterCompBotC);
            }, 1000);
            this.resetFormKill();
            jQuery("#killbotsModal").modal("hide");
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

  launchBotsMixed() {
    let value = this.launchBotsForm.value
    value.nameModel=this.modelo
    value.userId=this.usuario._id
    value.idRegisterCompBotContainer=this.dataLicences._id
    // console.log(value);
    if (value.nBots < 10) {
      return this.notificationService.showErr('El numero de bots debe ser mayor o igual a 10')
    }
    this.userService.getTokenBotMixed(value).subscribe(
      (res: any) => {
        const info = {
          token: res.token
        }
        if (value.nBots > this.dataLicences.AcctsFree) {
          return this.notificationService.showErr('El numero de bots no puede se mayor al permitido en el bot container')
        }
        this.botService.launchBotMixed(this.dataLicences.botContainer_idBotContainer.ip, info).subscribe(
          (data:any) => {
            const body = {
              nBots: value.nBots,
              Launch:true
            }
            this.botService.updateBotConatinerArrayComp(body, this.dataLicences._id).subscribe(
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
              this.getRegisterCompBotC(this.idRegisterCompBotC);
            }, 1000);
            this.resetFormLaunch();
            jQuery("#launchBotsmodal").modal("hide");
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

  killBotsMixed() {
    let value = this.killBotsForm.value
    value.nameModel=this.modelo
    value.userId=this.usuario._id
    value.idRegisterCompBotContainer=this.dataLicences._id
    if (value.nBots < 10) {
      return this.notificationService.showErr('El numero de bots debe ser mayor o igual a 10')
    }
    if (value.nBots > this.lengthkillbots) {
      Swal.fire({
        icon: 'warning',
        title: 'El numéro de killBots no puede ser mayor al numero de bots corriendo',
        showConfirmButton: false,
        timer: 3500
      })
      return;
    }
    this.userService.getTokenkillBotMixed(value).subscribe(
      (res: any) => {
        const info = {
          token: res.token
        }
        if ((value.nBots+this.dataLicences.AcctsFree) > this.dataLicences.AcctsUsed) {
          return this.notificationService.showErr('No es posible matar mas cuentas en el bot container')
        }
        this.botService.killBotMixed(this.dataLicences.botContainer_idBotContainer.ip, info).subscribe(
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
              nBots: value.nBots,
              Kill:true
            }
            this.botService.updateBotConatinerArrayComp(body, this.dataLicences._id).subscribe(
              (data:any) => {
              },
              err => {}
            )
            setTimeout(() => {
              this.getRegisters();
              this.getRegisterCompBotC(this.idRegisterCompBotC);
            }, 1000);
            this.resetFormKill();
            jQuery("#killbotsModal").modal("hide");
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

  getLengthActsModel() {
    const data = {
      nameModel: this.nickname,
      id_registerBotCompany: this.dataLicences._id
    }
    this.botService.getKillBotsByModel(this.dataLicences.botContainer_idBotContainer.ip, data).subscribe(
      (data:any) => {
        // console.log(data);
        this.lengthkillbots=data.acctsModelsLength
      }
    )
  }

  getRegisters() {
    this.modelsService.getRegisters(localStorage.getItem('idUser')).subscribe(
      (data:any) => {
        this.registers=data.dataPlatfm
        this.registersLength=data.dataPlatfm.length
      },
      err => {}
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

  goBack(){
    this._location.back();
  }

}
