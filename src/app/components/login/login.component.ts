import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin:any;

  private isValidEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  loginForm: FormGroup;
  registerForm: FormGroup;


  // loginForm = this.fb.group({
  //   email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
  //   password: ['', [Validators.required, Validators.minLength(6)]],
  // });


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    public nav: NavbarService
    ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.nav.hide();
    if (this.router.url == "/login") {
      this.formLogin = true
    } else {
      this.formLogin = false
    }


  }

  saveLogin(event: Event) {
    event.preventDefault();
    const value = this.loginForm.value;
    this.userService.getUserByEmail(value.email).subscribe(
      (data:any) => {
        if (this.loginForm.valid) {
          const value = this.loginForm.value;
          this.userService.signIn(value).subscribe(
            (res:any) => {
              localStorage.setItem('token', res.token);
              localStorage.setItem('idUser', res.user._id);
              Swal.fire({
                icon: 'success',
                title: "Login exitoso",
                showConfirmButton: false,
                timer: 1500
              })
              this.router.navigate(['/']);
            },
            err => {
              return Swal.fire({
                icon: 'warning',
                title: err.error.message,
                showConfirmButton: false,
                timer: 5000
              })
            }
          )
        } else{
          this.loginForm.markAllAsTouched();
        }
      },
      err => {
        console.error('Hay un error al obtener la data')
        console.clear()
      }
    )


    this.userService.getUserAdminByEmail(value.email).subscribe(
      (data:any) => {
        if (this.loginForm.valid) {
          const value = this.loginForm.value;
          this.userService.signInUserAdmin(value).subscribe(
            (res:any) => {
              console.log(res);
              localStorage.setItem('token', res.token);
              localStorage.setItem('idUserAdmin', res.user._id);              
              Swal.fire({
                icon: 'success',
                title: "Login exitoso",
                showConfirmButton: false,
                timer: 1500
              })
              if (res.user.isConfigFull === false) {
                this.router.navigate([`company/${res.user.company_idCompany}`]);
                return;
              }
              this.router.navigate(['/']);
            },
            err => {
              return Swal.fire({
                icon: 'warning',
                title: err.error.message,
                showConfirmButton: false,
                timer: 5000
              })
            }
          )
        } else{
          this.loginForm.markAllAsTouched();
        }
      },
      err => {
        console.error('Hay un error al obtener la data')
        console.clear()
      }
    )
  }

  saveRegister(event: Event) {
    event.preventDefault();
    if (this.registerForm.valid) {
      const value = this.registerForm.value;
      this.userService.signUp(value).subscribe(
        (res:any) => {
          Swal.fire({
            icon: 'success',
            title: "Usuario creado correctamente",
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/']);
        },
        err => {
          console.log(err);
          return Swal.fire({
            icon: 'warning',
            title: err.error.message,
            showConfirmButton: false,
            timer: 5000
          })
        }
      )
    } else{
      this.registerForm.markAllAsTouched();
    }
  }

  getValue(value: string) {
    return this.loginForm.get(value)
  }


  getValueRegister(value: string) {
    return this.registerForm.get(value)
  }


}
