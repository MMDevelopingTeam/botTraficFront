import { Component, OnInit } from '@angular/core';
import { ModelsService } from 'src/app/services/models.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  usuario: any;

  constructor(    
    public userService: UserService,
    public modelsService: ModelsService,
    private router: Router,
    public nav: NavbarService,
    ) { }

  ngOnInit(): void {
    this.nav.show();
    this.getInfoUrs();
  }

  getInfoUrs() {
    if (this.userService.loggedIn()) {
        this.userService.getInfoUserAdmin().subscribe(
          (data: any) => {
            this.usuario = data.dataUser;
            // console.log(this.usuario);
          },
          (error) => console.log(error)
          );
        return this.usuario;
    }
  }
  
  getSedes() {
    this.router.navigate([`users`]);
  }
  
  getModels() {
    this.router.navigate([`models/${this.usuario.company_idCompany}`]);
  }

}
