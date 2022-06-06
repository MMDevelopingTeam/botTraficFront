import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarService } from '../../services/navbar.service';
import { HeadquartersService } from '../../services/headquarters.service';
import { ModelsService } from '../../services/models.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2'
import { PlatformsService } from 'src/app/services/platforms.service';

@Component({
  selector: 'app-headquarters',
  templateUrl: './headquarters.component.html',
  styleUrls: ['./headquarters.component.scss']
})
export class HeadquartersComponent implements OnInit {
  id: any;
  dataHeadquarter: any;
  dataModels: any;
  dataUsers: any;
  dataUserType: any;

  private isValidEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  modelForm: FormGroup;
  modelUpdateForm: FormGroup;
  userForm: FormGroup;
  userUdateForm: FormGroup;
  dataModel: any;
  dataUser: any;
  platforms: any;

  constructor(
    private route: ActivatedRoute,
    private navbarService: NavbarService,
    private headquartersService: HeadquartersService,
    private platformsService: PlatformsService,
    private modelsService: ModelsService,
    private userService: UserService,
    private _location: Location,
    private fb: FormBuilder,
  ) {
    this.route.params.subscribe(params => {
      this.id=params.id;
    });

    this.modelForm = this.fb.group({
      nickname: ['', Validators.required],
      isAllowed: [true],
      isActive: [true],
      platforms_idPlatform: ['', Validators.required],
      headquarters_idHeadquarter: [this.id]
    });

    this.modelUpdateForm = this.fb.group({
      nickname: ['', Validators.required],
      isAllowed: ['',Validators.required],
      isActive: [],
      platforms_idPlatform: ['', Validators.required],
      headquarters_idHeadquarter: [this.id]
    });

    this.userForm = this.fb.group({
      user: ['', Validators.required],
      name: ['', Validators.required],
      email: ['',[Validators.required, Validators.pattern(this.isValidEmail)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userTypeArray: this.fb.array([]),
      headquarters_idHeadquarter: [this.id]
    });

    this.userUdateForm = this.fb.group({
      user: ['', Validators.required],
      name: ['', Validators.required],
      email: ['',[Validators.required, Validators.pattern(this.isValidEmail)]]
      // password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id=params.id;
    });
    this.navbarService.show();
    this.getHeadquarter();
    this.getModels();
    this.getUserTypes();
    this.getUsers();
    this.getPlatforms();
  }

  getHeadquarter(){
    this.headquartersService.getHeadquarterById(this.id).subscribe(
      (data: any) => {
        this.dataHeadquarter=data.dataHeadquarter
        // console.log(data);
      },
      err => console.log(err)
    )
  }
  getModels() {
    this.modelsService.getModelsByIDheadQ(this.id).subscribe(
      (data: any) => {
        this.dataModels=data.dataModel
        // console.log(data);
      },
      err => console.log(err)
    )
  }

  getUserTypes() {
    this.userService.getUserTypes().subscribe(
      (data:any) => {
        this.dataUserType=data.dataUserT[0]._id
        console.log(this.dataUserType);

      }
    )
  }

  getPlatforms() {
    this.platformsService.getPlatforms().subscribe(
      (data:any) => {
        this.platforms=data.dataPlatfm
      },
      err => {}
    )
  }

  editModel(model: any) {
    this.dataModel=model
    console.log(this.dataModel);
    this.modelUpdateForm.clearAsyncValidators()
  }

  editUser(user: any){
    this.dataUser=user
    this.userUdateForm.clearAsyncValidators()
  }

  saveFormModelUpdate(){
    if (this.modelUpdateForm.valid) {
      this.modelsService.updateModel(this.modelUpdateForm.value, this.dataModel._id).subscribe(
        (data: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Modelo actualizada',
            showConfirmButton: false,
            timer: 2000
          })
          this.getModels();
        },
        err => console.log(err)
      )
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Llena todos los campos',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  saveFormUserUpdate(){
    if (this.userUdateForm.valid) {
      this.userService.updateUser( this.dataUser._id, this.userUdateForm.value).subscribe(
        (data: any) => {
          console.log(data)
          Swal.fire({
            icon: 'success',
            title: 'Monitor actualizado',
            showConfirmButton: false,
            timer: 2000
          })
          this.getUsers();
        },
        err => console.log(err)
      )
    }else{
      console.log(this.userUdateForm.value);
      Swal.fire({
        icon: 'warning',
        title: 'Llena todos los campos',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  getUsers() {
    this.userService.getUsers(this.id).subscribe(
      (data:any) => {
        this.dataUsers=data.dataUsers
        console.log(data);
      }
    )
  }

  deleteModel(id: string) {
    Swal.fire({
      title: '¿Estas seguro de eliminar la modelo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.modelsService.deleteModel(id).subscribe(
          (data: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Modelo eliminada correctamente',
              showConfirmButton: false,
              timer: 2500
            })
            this.getModels();
          },
          err => console.log(err)
        )
      }
    })
  }

  goBack(){
    this._location.back();
  }

  getValue(value: string) {
    return this.modelForm.get(value)
  }
  getValueFormUser(value: string) {
    return this.userForm.get(value)
  }
  getValueFormUserUpdate(value: string) {
    return this.userUdateForm.get(value)
  }
  saveFormUser(){
    let data=[
      this.dataUserType
    ]
    let value = this.userForm.value
    value.userTypeArray=data
    // console.log(value)
    if(this.userForm.valid) {
      this.userService.signUp(value).subscribe(
        (data:any) => {
          Swal.fire({
            icon: 'success',
            title: 'monitor creado correctamente',
            showConfirmButton: false,
            timer: 2500
          })
          this.getUsers();
        }
      )
    }
  }

  saveFormModel() {
    if (this.modelForm.valid) {
      this.modelsService.createModel(this.modelForm.value).subscribe(
        (data: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Modelo Creada correctamente',
            showConfirmButton: false,
            timer: 2000
          })
          this.getModels();
        },
        err => console.log(err)
      )
    }
  }

  deleteUser(id: string){
    Swal.fire({
      title: '¿Estas seguro de eliminar el monitor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          (data: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Monitor eliminado correctamente',
              showConfirmButton: false,
              timer: 2500
            })
            this.getUsers();
          },
          err => console.log(err)
        )
      }
    })
  }
}
