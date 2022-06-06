import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BotService } from '../../../../services/bot.service';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proxys',
  templateUrl: './proxys.component.html',
  styleUrls: ['./proxys.component.scss']
})
export class ProxysComponent implements OnInit {
  id: any;
  botContainer: any;
  proxys: any;

  proxysForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private botService: BotService,
    private _location: Location,
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
      }
    )
  }

  saveProxys(){
    if (this.proxysForm.valid) {
      this.botService.saveProxys(this.proxysForm.value, this.botContainer.ip).subscribe(
        (data:any) => {
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

}
