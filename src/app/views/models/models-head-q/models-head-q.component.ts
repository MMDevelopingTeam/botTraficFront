import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelsService } from '../../../services/models.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-models-head-q',
  templateUrl: './models-head-q.component.html',
  styleUrls: ['./models-head-q.component.scss']
})
export class ModelsHeadQComponent implements OnInit {
  id: any;
  dataModels: any;
  dataModel: any;

  accessForm: FormGroup;

  constructor(
    // private headquartersService:HeadquartersService,
    private modelsService:ModelsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _location: Location,
  ) { 
    this.route.params.subscribe(params => {
      this.id=params.id;
    });

    this.accessForm = this.fb.group({
      isAllowed: [,Validators.required]
    });

  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id=params.id;
    });
    this.getModelos();
  }

  getModelos(){
    this.modelsService.getModelsByIDheadQ(this.id).subscribe(
      (data:any) => {
        this.dataModels=data.dataModel
        console.log(this.dataModels)
      },
      err => console.log(err)
    )
  }

  getModel(model: any){
    this.dataModel=model
  }

  updateModel(){
    if (this.accessForm.valid === true) {
      this.modelsService.updateModel(this.accessForm.value, this.dataModel).subscribe(
        (data:any) => {
          Swal.fire(
            'Modelo Actualizada',
            'Modelo actualizada correctamente.',
            'success'
          )
          this.getModelos();
        },
        err => console.log(err)
      )
    }
  }

  getValue(value: string) {
    return this.accessForm.get(value)
  }

  goBack(){
    this._location.back();
  }
}
