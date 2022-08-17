import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CompanyService } from 'src/app/services/company.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

declare var jQuery:any;

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {

  id: any;
  dataUsers: any;
  dataUserType: any;

  private isValidEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  userForm: FormGroup;
  
  dataUserEdit: User={
    name: '',
    user: '',
    email: '',
    password: '',
    userTypeArray: [],
    company_idCompany: ''
  };

  url: any;

  p:any;

  usersLength: any;
  usuario: any;

  constructor(
    private route: ActivatedRoute,
    private navbarService: NavbarService,
    private NotificationService: NotificationService,
    private companyService :CompanyService,
    private router: Router,
    private userService: UserService,
    private _location: Location,
    private fb: FormBuilder,
  ) {
    this.route.params.subscribe(params => {
      this.id=params.id;
    });

    this.userForm = this.fb.group({
      user: ['', Validators.required],
      name: ['', Validators.required],
      email: ['',[Validators.required, Validators.pattern(this.isValidEmail)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      VerifiedPassword: ['', [Validators.required, Validators.minLength(6)]],
      userTypeArray: this.fb.array([]),
      company_idCompany: [this.id]
    });
  }

  ngOnInit(): void {
    this.url=this.router.url.split('/')[1]
    this.route.params.subscribe(params => {
      this.id=params.id;
    });
    this.navbarService.show();
    this.getUserTypes();
    this.getInfoUrs();
  }

  getInfoUrs() {
    if (this.userService.loggedIn()) {
        this.userService.getInfoUserAdmin().subscribe(
          (data: any) => {
            this.usuario = data.dataUser;
            this.getUsers()
          },
          (error) => console.log(error)
          );
        return this.usuario;
    }
  }

  getUsers() {
    this.userService.getUsers(this.usuario.company_idCompany._id).subscribe(
      (data:any) => {
        this.dataUsers=data.dataUsers
        this.usersLength=data.dataUsers.length
      }
    )
  }

  getUserTypes() {
    this.userService.getUserTypes().subscribe(
      (data:any) => {
        this.dataUserType=data.dataUserT[0]._id

      }
    )
  }

  editUser(user: any){
    this.dataUserEdit=user
  }

  esEmailValido(email:string) {
    let mailValido = false;
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(EMAIL_REGEX)){
      mailValido = true;
    }
  return mailValido;
  }

  saveFormUser(){
    let data=[
      this.dataUserType
    ]
    let value = this.userForm.value
    value.userTypeArray=data
    if (value.password !== value.VerifiedPassword) {
      return this.NotificationService.showErr('Las contraseñas no coinciden')
    }
    if(this.userForm.valid) {
      this.userService.signUp(value).subscribe(
        (data:any) => {
          this.getUsers();
          jQuery("#createmoderatorModal").modal("hide");
          Swal.fire({
            icon: 'success',
            title: 'monitor creado correctamente',
            showConfirmButton: false,
            timer: 2500
          })
        }
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

  saveFormUserUpdate(){
    this.userService.updateUser( this.dataUserEdit._id, this.dataUserEdit).subscribe(
      (data: any) => {
        this.getUsers();
        jQuery("#editUserModal").modal("hide");
        Swal.fire({
          icon: 'success',
          title: 'Monitor actualizado',
          showConfirmButton: false,
          timer: 2000
        })
      },
      err => console.log(err)
    )
  }

  goBack(){
    this._location.back();
  }

  getValueFormUser(value: string) {
    return this.userForm.get(value)
  }

  continue(){
    this.companyService.updateCompanyIsConfigFull(this.id).subscribe(
      (data:any) => {
        this.router.navigate(['/']);
      },
      err => console.log(err)
    )
  }

}
