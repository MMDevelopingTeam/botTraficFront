import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { NavbarService } from 'src/app/services/navbar.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin:any;

  private isValidEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private companyService: CompanyService,
    public nav: NavbarService
    ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.nav.hide();
  }

  saveLogin(event: Event) {
    event.preventDefault();
    if (this.loginForm.valid) {
      const value = this.loginForm.value;
      this.userService.signIn(value).subscribe(
        (res:any) => {
          Swal.fire({
            icon: 'success',
            title: "Login exitoso",
            showConfirmButton: false,
            timer: 1500
          })
          if (res.user.company_idCompany) {
            this.companyService.getCompanyById(res.user.company_idCompany).subscribe(
              (data:any) => {
                if (data.dataCompany.isConfigFull === false) {
                  this.router.navigate([`company/${res.user.company_idCompany}`]);
                }
              },
              err => {}
            )
          }
          if (res.user.userTypeArray && res.user.company_idCompany) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('idUser', res.user._id);
            this.router.navigate(['/dashboard/user']);
          }
          if (res.user.company_idCompany && res.user.userType) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('idUserAdmin', res.user._id);
            this.router.navigate(['/dashboard/userAdmin']);
          }
          if (res.user.ipFrom) {
            localStorage.setItem('tokenSuperU', res.token);
            localStorage.setItem('idSuperUser', res.user._id);
            this.router.navigate(['/dashboard/superUser']);
          }
        },
        err => {}
      )
    } else{
      this.loginForm.markAllAsTouched();
    }
  }

  getValue(value: string) {
    return this.loginForm.get(value)
  }
}
