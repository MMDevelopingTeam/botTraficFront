import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BotService } from '../../services/bot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  dataModels:any= []
  lenghtProxys: any
  lenghtAccts: any

  modelo: any

  constructor(
    public userService: UserService,
    public botService: BotService,
  ) { }

  ngOnInit(): void {
    this.botService.getModels().subscribe(
      (res:any) => {
        console.log(res);
        this.dataModels=res.dataModels
      },
      err => {
        console.log(err);
      }
    )
    this.botService.getProxys().subscribe(
      (res:any) => {
        this.lenghtProxys=res.prsModels.length
      },
      err => {
        console.log(err);
      }
    )
    this.botService.getAccts().subscribe(
      (res:any) => {
        this.lenghtAccts=res.acctsModels.length
      },
      err => {
        console.log(err);
      }
    )
  }

  lanzarBots(name_model: String){
    const data = {
      name_model
    }
    this.botService.launchBot(data).subscribe(
      (res:any) => {
        Swal.fire({
          icon: 'success',
          title: "bots lanzados",
          showConfirmButton: false,
          timer: 2000
        })
      },
      res => console.log(res)
    )
  }
}
