import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-company-user-admin',
  templateUrl: './company-user-admin.component.html',
  styleUrls: ['./company-user-admin.component.scss']
})
export class CompanyUserAdminComponent implements OnInit {

  dataCompany:Company = {
    nameCompany: "",
    typeCompany: "",
    addressCompany: "",
    telephoneCompany: "",
    logo: ""
  }
  id:any

  constructor(
    private nav: NavbarService,
    private router: Router,
    private route: ActivatedRoute, 
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id=params.id;
      this.companyService.getCompanyById(params.id).subscribe(
        (data: any) => {
          this.dataCompany.nameCompany=data.dataCompany.nameCompany
          this.dataCompany.typeCompany=data.dataCompany.typeCompany
          this.dataCompany.addressCompany=data.dataCompany.addressCompany
          this.dataCompany.telephoneCompany=data.dataCompany.telephoneCompany
          this.dataCompany.logo=data.dataCompany.logo
        },
        err => {
          console.log(err);
        }
      )
    });
    this.nav.show();
  }

  saveForm() {
    this.companyService.updateCompany(this.dataCompany, this.id).subscribe(
      (data:any) => {
        this.router.navigate([`company/users/${this.id}`]);
      },
      err => console.log(err)
    )
  }

}
