import { Component, OnInit } from '@angular/core';
import { ModelsService } from 'src/app/services/models.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { LicensesService } from 'src/app/services/licenses.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  usuario: any;
  idComp: any;

  constructor(    
    public userService: UserService,
    public modelsService: ModelsService,
    public licensesService: LicensesService,
    private router: Router,
    public nav: NavbarService,
    ) { }

  ngOnInit(): void {
    this.userService.tokenValid();
    this.nav.show();
    this.getInfoUrs();
  }

  getInfoUrs() {
    if (this.userService.loggedIn()) {
        this.userService.getInfoUserAdmin().subscribe(
          (data: any) => {
            this.usuario = data.dataUser;
            this.idComp=this.usuario.company_idCompany._id
            this.licensesService.expirationLicencesByCompany(this.idComp).subscribe(
              (data:any) => {}
            )
          },
          (error) => console.log(error)
          );
    }
  }
  
  getSedes() {
    this.router.navigate([`users`]);
  }
  
  getModels() {
    this.router.navigate([`models/${this.idComp}`]);
  }

  getDevices() {
    this.router.navigate([`devices/${this.idComp}`]);
  }

  getStats() {
    this.router.navigate([`stats/${this.idComp}`]);
  }

}
