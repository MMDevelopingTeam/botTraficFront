import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SocketWebService } from 'src/app/services/socket-web.service';
import { UserService } from 'src/app/services/user.service';
import { BotService } from '../../../services/bot.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  p:any;
  pD:any;
  pT:any;

  NbotsContainers: any;
  allActs: any;
  allActsFree: any;
  allproxys: any;
  allproxysFree: any;
  botContainers: any;
  infoBot: any;

  loading: boolean = false;

  dataComp: any;
  datalicences: any;
  dataModels: any;
  dataPlatforms: any;
  dataU: any;
  dataUa: any;
  dataAccessLog: any;
  dataAccessLogAdmin: any;
  dataAccessLogFalse: any;
  dataAccessLogAdminFalse: any;

  modalTitle: string = "";

  constructor(
    private _location: Location,
    private BotService: BotService,
    private userService: UserService,
    private socket: SocketWebService,
  ) {}

  ngOnInit(): void {
    this.userService.tokenValidSuperU()
    this.loading=true;
    this.callStats();
    this.socket.listen("updateStats").subscribe(
      (data:any) => {
        this.callStats();
      }
    )

  }

  callStats(){
    this.getStadistics();
    this.getAllComp();
    this.getAllLicences();
    this.getAllModels();
    this.getAllplatforms();
    this.getAllusers();
    this.getAllusersAdmin();
    this.getAccessLogs();
    this.getAccessLogsAdmin();
    this.getAccesslogsFalse();
    this.getAccesslogsFalseAdmin();
  }

  getStadistics(){
    this.BotService.getStadistics().subscribe(
      (data:any) => {
        this.loading=false;
        this.NbotsContainers=data.NbotsContainers,
        this.allActs=data.allActs,
        this.allActsFree=data.allActsFree,
        this.allproxys=data.allproxys,
        this.allproxysFree=data.allproxysFree,
        this.botContainers=data.botContainers
      }
    )
  }

  getAllComp(){
    this.BotService.getAllComp().subscribe(
      (data:any) => {
        this.dataComp=data
      }
    )
  }
  getAllLicences(){
    this.BotService.getAllLicences().subscribe(
      (data:any) => {
        this.datalicences=data
      }
    )
  }
  getAllModels(){
    this.BotService.getAllModels().subscribe(
      (data:any) => {
        this.dataModels=data
      }
    )
  }
  getAllplatforms(){
    this.BotService.getAllplatforms().subscribe(
      (data:any) => {
        this.dataPlatforms=data
      }
    )
  }
  getAllusers(){
    this.BotService.getAllusers().subscribe(
      (data:any) => {
        this.dataU=data
      }
    )
  }
  getAllusersAdmin(){
    this.BotService.getAllusersAdmin().subscribe(
      (data:any) => {
        this.dataUa=data
      }
    )
  }

  getAccessLogs(){
    this.BotService.getAccessLogs().subscribe(
      (data:any) => {
        this.dataAccessLog=data.dataA
      }
    )
  }

  getAccessLogsAdmin(){
    this.BotService.getAccessLogsAdmin().subscribe(
      (data:any) => {
        this.dataAccessLogAdmin=data.dataA
      }
    )
  }

  getAccesslogsFalse(){
    this.BotService.getAccesslogsFalse().subscribe(
      (data:any) => {
        this.dataAccessLogFalse=data.dataA
      }
    )
  }

  getAccesslogsFalseAdmin(){
    this.BotService.getAccesslogsFalseAdmin().subscribe(
      (data:any) => {
        this.dataAccessLogAdminFalse=data.dataA
      }
    )
  }

  dataModal(text: string){
    this.modalTitle=text;
  }

  getinfoBot(botContainer: any){
    this.infoBot=botContainer
  }

  goBack(){
    this._location.back();
  }

}
