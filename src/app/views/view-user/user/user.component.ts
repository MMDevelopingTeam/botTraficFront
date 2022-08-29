import { Component, OnInit } from '@angular/core';
import { BotService } from 'src/app/services/bot.service';
import { ModelsService } from 'src/app/services/models.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { PlatformsService } from '../../../services/platforms.service';
import { NotificationService } from '../../../services/notification.service';
import { LicensesService } from 'src/app/services/licenses.service';
import { Location } from '@angular/common';

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
  IfValid: boolean=false;

  
  botContainers:any = [];
  botContainersAll:any = [];
  
  idPlatfom: any;
  idCompany: any;
  ipBot: any;

  licences: any;
  licencesPosible: any;
  licenceSelect: any;
  loadingBots: boolean = false;

  constructor(
    public userService: UserService,
    public botService: BotService,
    public modelsService: ModelsService,
    public platformsService: PlatformsService,
    public licensesService: LicensesService,
    public notificationService: NotificationService,
    private router: Router,
    public nav: NavbarService,
    private _location: Location,
    private fb: FormBuilder
    ) {
      this.launchBotsForm = this.fb.group({
        nameModel: [''],
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
    this.userService.verifyToken(localStorage.getItem('token')).subscribe(
      (data: any) => {
        if (data.success === false) {
          this.userService.logout();
          this.router.navigate([`/`]);
        }
      }
    )
    this.isLoadingBots=true
    this.nav.show();
    this.getInfoUrs();
  }


  getInfoUrs() {
    this.userService.getInfoUser().subscribe(
      (data: any) => {
        this.usuario = data.dataUser;
        for (const iterator of this.usuario.userTypeArray) {
          if (iterator.nameUserType === 'moderator') {
            this.getPlatforms()
            this.IfValid=true
          }
        }
        this.licensesService.expirationLicencesByCompany(this.usuario.company_idCompany._id).subscribe(
          (data:any) => {}
        )
      },
      (error) => console.log(error)
    );
  }

  goBack(){
    this._location.back();
  }

  getPlatforms() {
    this.platformsService.getPlatforms().subscribe(
      (data: any) => {
        this.platforms=data.dataPlatfm
      }
    )
  }

  redirect(name:any){
    this.router.navigate([`/dashboard/user/${name}`]);
  }

}
