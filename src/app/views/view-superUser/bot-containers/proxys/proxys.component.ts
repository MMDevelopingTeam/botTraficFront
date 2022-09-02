import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BotService } from '../../../../services/bot.service';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-proxys',
  templateUrl: './proxys.component.html',
  styleUrls: ['./proxys.component.scss']
})
export class ProxysComponent implements OnInit {
  id: any;
  botContainer: any;
  proxys: any;

  p:any;
  proxysLength:any;

  ifBot: boolean=false;

  proxysForm: FormGroup;
  loadingMs: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private botService: BotService,
    private _location: Location,
    private notificationService: NotificationService,
    private fb: FormBuilder,
  ) {
    this.route.params.subscribe(params => {
      this.id=params.id;
    });

    this.proxysForm = this.fb.group({
      proxysStrings: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getBotcontainer();
  }

  getBotcontainer(){
    this.botService.getBotContainerById(this.id).subscribe(
      (data:any) => {
        this.botContainer=data.dataBotContainer
        this.getProxys();
      },
      err => {}
    )
  }

  getProxys(){
    this.botService.getAllProxys(this.botContainer.ip).subscribe(
      (data:any) => {
        this.proxys=data.prsModels
        this.proxysLength=data.prsModels.length
        console.log(this.proxysLength);
        this.ifBot=true
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error al conectar al bot',
          showConfirmButton: false,
          timer: 2000
        })
      }
    )
  }

  latencia(){
    this.loadingMs = true;
    this.botService.getLatenciaProxys(this.botContainer.ip).subscribe(
      (data:any) => {
        this.getProxys();
        Swal.fire({
          icon: 'success',
          title: 'Latencias actualizadas correctamente',
          showConfirmButton: false,
          timer: 2000
        })
        this.loadingMs = false;
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error al conectar al bot',
          showConfirmButton: false,
          timer: 2000
        })
      }
    )
  }

  saveProxys(){
    if (this.proxysForm.valid) {
      this.botService.saveProxys(this.proxysForm.value, this.botContainer.ip).subscribe(
        (data:any) => {
          this.resetForm();
          Swal.fire({
            icon: 'success',
            title: 'Proxys agregados correctamente',
            showConfirmButton: false,
            timer: 2500
          })
          this.getProxys()
        },
        err => {}
      )
    }
  }

  goBack(){
    this._location.back();
  }

  getValue(value: string) {
    return this.proxysForm.get(value)
  }

  resetForm(){
    this.proxysForm.reset()
  }

}
