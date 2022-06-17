import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';
import { CompanyService } from '../../../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from '../../../models/company';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {

  dataCompany:Company = {
    nameCompany: "",
    typeCompany: "",
    addressCompany: "",
    telephoneCompany: "",
    logo: ""
  }
  id:any

  constructor(private nav: NavbarService, private router: Router, private route: ActivatedRoute, private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id=params.id;
      this.companyService.getCompanyById(params.id).subscribe(
        (data: any) => {
          this.dataCompany=data.dataCompany
          console.log(data.dataCompany);
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
        console.log(data)
        this.router.navigate([`company/headquarter/${this.id}`]);
      },
      err => console.log(err)
    )
  }
}
