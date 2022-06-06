import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BotService } from '../../../services/bot.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  lengthAccts: any;
  lengthAcctsFree: any;
  lengthProxys: any;
  lengthProxysFree: any;
  valueAccts: any;
  valueProxys: any;

  constructor(
    private _location: Location,
    private BotService: BotService,
  ) {}

  ngOnInit(): void {
    this.getAllAccts()
    this.getAllProxys()
  }

  getAllAccts(){
    this.BotService.getAllAccts('localhost').subscribe(
      (data:any) => {
        this.lengthAccts=data.acctsModelslength
        this.BotService.getAllAcctsFree('localhost').subscribe(
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
    this.BotService.getAllProxys('localhost').subscribe(
      (data:any) => {
        this.lengthProxys=data.prsModelsLength
        this.BotService.getAllProxysFree('localhost').subscribe(
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


  goBack(){
    this._location.back();
  }

}
