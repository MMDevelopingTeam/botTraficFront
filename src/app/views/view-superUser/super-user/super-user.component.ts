import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-super-user',
  templateUrl: './super-user.component.html',
  styleUrls: ['./super-user.component.scss']
})
export class SuperUserComponent implements OnInit {

  constructor(
    public nav: NavbarService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.nav.show();
  }

  getCompanys() {
    this.router.navigate([`dashboard/superUser/companys`]);
  }
  getbotContainer() {
    this.router.navigate([`dashboard/superUser/botContainers`]);
  }
  getplatforms() {
    this.router.navigate([`dashboard/superUser/platforms`]);
  }
  getLicenses() {
    this.router.navigate([`dashboard/superUser/licenses`]);
  }
  getUserTypes() {
    this.router.navigate([`dashboard/superUser/userTypes`]);
  }
  getPermissions() {
    this.router.navigate([`dashboard/superUser/permissions`]);
  }
  getStatistics() {
    this.router.navigate([`dashboard/superUser/statistics`]);
  }

}
