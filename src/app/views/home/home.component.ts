import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BotService } from '../../services/bot.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NavbarService } from '../../services/navbar.service';
import { ModelsService } from '../../services/models.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  dataModels:any
  lengthProxys: any
  dataUserType: any
  lengthAccts: any
  lengthkillbots: any

  isAdmin: any

  modelo: any
  modeloKillbot: any
  usuario: any
  roles:any

  launchBotsForm: FormGroup
  killBotsForm: FormGroup

  constructor(
    public userService: UserService,
    public botService: BotService,
    public modelsService: ModelsService,
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
      nameModel: [this.modelo],
      userId: [localStorage.getItem('idUser')],
      nBots: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.nav.show();
    this.getInfoUrs();
    if (localStorage.getItem('idUserAdmin')) {
      this.isAdmin=true
    }
  }


  getInfoUrs() {
    if (this.userService.loggedIn()) {
      if (localStorage.getItem('idUserAdmin')) {
        this.userService.getInfoUserAdmin().subscribe(
          (data: any) => {
            this.usuario = data.dataUser;
            // console.log(this.usuario);
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
              // console.log(data)
              this.dataModels=data.dataModel
            },
            err => console.log(err)
          )
        },
        (error) => console.log(error)
      );
    }
  }


  getSedes() {
    this.router.navigate([`headquarters/${this.usuario.company_idCompany}`]);
  }
  
  getModels() {
    this.router.navigate([`models/${this.usuario.company_idCompany}`]);
  }

  dataModel(model: string) {
    this.modelo=model
  }
  dataModelKillbot(model: any) {
    this.modeloKillbot=model
    const data = {
      nameModel: model
    }
    this.botService.getKillBotsByModel(data).subscribe(
      (data:any) => {
        // console.log(data)
        this.lengthkillbots=data.acctsModels
      },
      err => {}
    )
  }

  launchBots() {
    let value = this.launchBotsForm.value
    value.nameModel=this.modelo
    this.userService.getTokenBot(value).subscribe(
      (res: any) => {
        const info = {
          token: res.token
        }
        this.botService.launchBot(info).subscribe(
          (data:any) => {
            console.log(data)
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
    value.nameModel=this.modeloKillbot
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
        this.botService.killBot(info).subscribe(
          (data:any) => {
            console.log(data)
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
}
