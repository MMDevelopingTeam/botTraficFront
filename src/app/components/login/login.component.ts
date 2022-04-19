import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  formLogin:any;

  private isValidEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    if (this.router.url == "/login") {
      this.formLogin = true
    } else {
      this.formLogin = false
    }
  }

  saveLogin(event: Event) {
    event.preventDefault();
    if (this.loginForm.valid) {
      const value = this.loginForm.value;
      this.userService.signIn(value).subscribe(
        (res:any) => {
          localStorage.setItem('token', res.token);
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
      console.log(value);
    } else{
      this.loginForm.markAllAsTouched();
    }
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

  get emailField() {
    return this.loginForm.get('email');
  }
  get passwordField() {
    return this.loginForm.get('password');
  }

  get usernameFieldRegister() {
    return this.registerForm.get('username');
  }
  get emailFieldRegister() {
    return this.registerForm.get('email');
  }
  get passwordFieldRegister() {
    return this.registerForm.get('password');
  }
}
