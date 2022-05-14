import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';
import { CompanyService } from '../../../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {

  dataCompany:any
  id:any

  CompanyForm: FormGroup;

  constructor(private nav: NavbarService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private companyService: CompanyService) {
    this.CompanyForm = this.fb.group({
      addressCompany: [''],
      telephoneCompnay: [''],
      typeCompany: ['', Validators.required],
      logoCompany: [''],
    });
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
    this.nav.hide();
  }

  saveForm() {
    this.companyService.updateCompany(this.CompanyForm.value, this.id).subscribe(
      (data:any) => {
        console.log(data)
        this.router.navigate([`company/headquarter/${this.id}`]);
      },
      err => console.log(err)
    )
  }

  getValue(value: string) {
    return this.CompanyForm.get(value)
  }

}
