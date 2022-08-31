import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModelsService } from 'src/app/services/models.service';
import { PlatformsService } from 'src/app/services/platforms.service';
import Swal from 'sweetalert2'

declare var jQuery:any;

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  models: any;
  model: any;

  modelEditForm = {
    nickname: '',
    platforms_idPlatform: '',
    isAllowed: Boolean,
    isActive: Boolean
  };

  modelsLength: any;

  p: any;
  
  idCompany: any;

  modelCreateForm: FormGroup;

  platforms: any;
  idModel: any;

  constructor(
    private _location: Location,
    private modelsService: ModelsService,
    private platformsService: PlatformsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.route.params.subscribe(params => {
      this.idCompany=params.id;
    });

    this.modelCreateForm = this.fb.group({
      nickname: ['', Validators.required],
      platforms_idPlatform: ['', Validators.required],
      company_idCompany: [''],
    });

  }

  ngOnInit(): void {
    this.getModels()
    this.getPlatforms()
  }

  getModels() {
    this.modelsService.getModelsByIDCompany(this.idCompany).subscribe(
      (data:any) => {
        this.models=data.dataModel
      }
    )
  }

  getPlatforms(){
    this.platformsService.getPlatforms().subscribe(
      (data:any) => {
        this.platforms=data.dataPlatfm
      }
    )
  }

  getModel(model: any){
    this.model = undefined
    this.model = model
  }

  getModelEdit(model: any){
    this.modelEditForm.nickname = model.nickname
    this.modelEditForm.platforms_idPlatform = model.platforms_idPlatform._id
    this.modelEditForm.isAllowed = model.isAllowed
    this.modelEditForm.isActive = model.isActive
    this.idModel = model._id
  }

  modelCreate() {
    if (this.modelCreateForm.valid) {
      let value = this.modelCreateForm.value;
      value.company_idCompany=this.idCompany;
      this.modelsService.createModel(value).subscribe(
        (data:any) => {
          this.getModels();
          jQuery("#createModal").modal("hide");
          this.resetForm();
          Swal.fire({
            icon: 'success',
            title: 'Modelo creada correctamente',
            showConfirmButton: false,
            timer: 2500
          })
        }
      )
    }
  }

  modelEdit() {
    this.modelsService.updateModel(this.modelEditForm, this.idModel).subscribe(
      (data:any) => {
        this.getModels();
        jQuery("#platformEditModal").modal("hide");
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

  deleteModel(model: any) {
    Swal.fire({
      title: 'Eliminar',
      text: "¿Estas seguro que quieres eliminar la modelo?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.modelsService.deleteModel(model).subscribe(
          (data:any) => {
            this.getModels();
            Swal.fire({
              icon: 'success',
              title: 'Modelo eliminada correctamente',
              showConfirmButton: false,
              timer: 2500
            })
          },
          err => {}
        )
      }
    })
  }

  goBack(){
    this._location.back();
  }

  getValueCreate(value: string) {
    return this.modelCreateForm.get(value)
  }

  resetForm(){
    this.modelCreateForm.reset()
  }
}
