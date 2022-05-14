import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BotService } from '../../services/bot.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NavbarService } from '../../services/navbar.service';
import { ModelsService } from '../../services/models.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  dataModels:any
  lenghtProxys: any
  dataUserType: any
  lenghtAccts: any

  isAdmin: any

  modelo: any
  usuario: any
  roles:any
  
  constructor(
    public userService: UserService,
    public botService: BotService,
    public modelsService: ModelsService,
    private router: Router,
    public nav: NavbarService
  ) { }

  ngOnInit(): void {
    this.nav.show();
    this.getInfoUrs();
    if (localStorage.getItem('idUserAdmin')) {
      this.isAdmin=true
    }
    // this.botService.getProxys().subscribe(
    //   (res:any) => {
    //     this.lenghtProxys=res.prsModels.length
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // )
    // this.botService.getAccts().subscribe(
    //   (res:any) => {
    //     this.lenghtAccts=res.acctsModels.length
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // )
  }

  getInfoUrs() {
    if (this.userService.loggedIn()) {
      if (localStorage.getItem('idUserAdmin')) {
        this.userService.getInfoUserAdmin().subscribe(
          (data: any) => {
            this.usuario = data.dataUser;
            console.log(this.usuario);
          },
          (error) => console.log(error)
          );
        return this.usuario;
      }
      this.userService.getInfoUser().subscribe(
        (data: any) => {
          this.usuario = data.dataUser;
          this.roles = data.dataUser.userTypeArray;
          this.modelsService.getModelsByIDheadQ(this.usuario.headquarters_idHeadquarter).subscribe(
            (data:any) => {
              console.log(data)
              this.dataModels=data.dataModel
            },
            err => console.log(err)
          )
        },
        (error) => console.log(error)
      );
    }
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

  getSedes() {
    this.router.navigate([`headquarters/${this.usuario.company_idCompany}`]);
  }
  
  getModels() {
    this.router.navigate([`models/${this.usuario.company_idCompany}`]);
  }

  launchBots(model:any) {

  }

}
