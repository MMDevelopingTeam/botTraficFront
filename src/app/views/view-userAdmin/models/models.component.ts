import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { ModelsService } from 'src/app/services/models.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PlatformsService } from 'src/app/services/platforms.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

declare var jQuery:any;

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  usuario: any;
  models: any;
  id: any;
  url: any;
  p: any;

  modelEditForm = {
    nickname: '',
    isAllowed: Boolean,
    isActive: Boolean,
    platforms_idPlatform: ''
  };
  
  platforms: any;
  idModel: any;

  constructor(
    private route: ActivatedRoute,
    private navbarService: NavbarService,
    private NotificationService: NotificationService,
    private platformsService : PlatformsService,
    private router: Router,
    private userService: UserService,
    private modelsService: ModelsService,
    private _location: Location,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userService.tokenValid();
    this.url=this.router.url.split('/')[1]
    this.route.params.subscribe(params => {
      this.id=params.id;
    });
    this.navbarService.show();
    this.getInfoUrs();
    this.getPlatforms();
  }

  getInfoUrs() {
    if (this.userService.loggedIn()) {
        this.userService.getInfoUserAdmin().subscribe(
          (data: any) => {
            this.usuario = data.dataUser;
            this.getModels()
          },
          (error) => console.log(error)
          );
        return this.usuario;
    }
  }

  getModelEdit(model: any){
    this.modelEditForm.nickname = model.nickname
    this.modelEditForm.isAllowed = model.isAllowed
    this.modelEditForm.isActive = model.isActive
    this.modelEditForm.platforms_idPlatform = model.platforms_idPlatform._id
    this.idModel = model._id
  }

  getPlatforms(){
    this.platformsService.getPlatforms().subscribe(
      (data:any) => {
        this.platforms=data.dataPlatfm
      }
    )
  }

  editModel() {
    this.modelsService.updateModel(this.modelEditForm, this.idModel).subscribe(
      (data:any) => {
        this.getModels();
        jQuery("#modelEditModal").modal("hide");
        Swal.fire({
          icon: 'success',
          title: 'Modelo actualizada correctamente',
          showConfirmButton: false,
          timer: 2500
        })
      },
      err => {}
    )
  }

  getModels() {
    this.modelsService.getModelsByIDCompany(this.id).subscribe(
      (data:any) => {
        this.models=data.dataModel
      }
    )
  }

  goBack() {
    this._location.back();
  }

}
