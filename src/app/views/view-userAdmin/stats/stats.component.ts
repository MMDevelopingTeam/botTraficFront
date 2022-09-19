import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BotService } from 'src/app/services/bot.service';
import { ModelsService } from 'src/app/services/models.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  id: any;
  
  pD: any;
  pM: any;
  pU: any;

  pA: any;
  pMx: any;
  pL: any;

  pAu: any;

  loading: boolean = false;
  loadingData: boolean = false;
  loadingDataUsers: boolean = false;

  dataUsers: any;
  dataUsersAdmins: any;
  dataRegisterLicences: any;
  dataRegisterBots: any;
  dataAccessLogLastMonth: any;
  dataAccessLogAdminLastMonth: any;
  models: any;
  users: any;

  titleModalUser: string = "";
  titleModalModel: string = "";

  arrayNbotsAnyByModel = [] as any;
  arrayNbotsMixByModel = [] as any;
  arrayNbotsLogByModel = [] as any;
  arrayByUser = [] as any;

  constructor(
    private botService: BotService,
    private userService: UserService,
    private modelsService: ModelsService,
    private route: ActivatedRoute,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.loading=true
    this.route.params.subscribe(params => {
      this.id=params.id;
    });
    this.botService.getAllStatsAdmin(this.id).subscribe(
      (data: any) => {
        this.loading=false
        console.log(data);
        this.dataUsers=data.users,
        this.dataUsersAdmins=data.usersAdmin,
        this.dataRegisterLicences=data.registerLicences,
        this.dataRegisterBots=data.registerBots,
        this.dataAccessLogLastMonth=data.accessLogLastMonth,
        this.dataAccessLogAdminLastMonth=data.accessLogAdminLastMonth
      }
    )
    this.gets();
  }

  gets(){
    this.getsModels();
    this.getsUsers();
  }
  getsModels(){
    this.modelsService.getModelsByIDCompany(this.id).subscribe(
      (data: any) => {
        this.models=data.dataModel;
      }
    )
  }
  getsUsers(){
    this.userService.getUsers(this.id).subscribe(
      (data: any) => {
        this.users=data.dataUsers;
      }
    )
  }

  dataModel(id: string, title: string){
    this.titleModalModel=title
    this.loadingData=true;
    this.arrayNbotsAnyByModel=[];
    this.arrayNbotsMixByModel=[];
    this.arrayNbotsLogByModel=[];
    for (const item of this.dataRegisterBots) {
      if (item.name_model === title) {
        if (item.typeBot === 'actsAny') {
          this.arrayNbotsAnyByModel.push(item);
        }
        if (item.typeBot === 'actsMixed') {
          this.arrayNbotsMixByModel.push(item);
        }
        if (item.typeBot === 'actsLogued') {
          this.arrayNbotsLogByModel.push(item);
        }
      }
    }
    this.loadingData=false;
  }

  dataUser(id: string, title: string){
    this.titleModalUser=title
    this.loadingDataUsers=true;
    this.arrayByUser=[];
    for (const item of this.dataRegisterBots) {
      if (item.userId._id === id) {
        this.arrayByUser.push(item)
      }
    }
    this.loadingDataUsers=false;
  }

  goBack(){
    this._location.back();
  }

}
