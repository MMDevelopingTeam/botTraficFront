import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeadquartersService } from '../../../services/headquarters.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-create-headquarters',
  templateUrl: './create-headquarters.component.html',
  styleUrls: ['./create-headquarters.component.scss']
})
export class CreateHeadquartersComponent implements OnInit {

  id:any;
  dataHeadquarters:any;
  dataHeadquarter:any;

  HeadquarterForm: FormGroup;
  HeadquarterUpdateForm: FormGroup;
  url: any;

  constructor(private _location: Location, private userService:UserService, private nav: NavbarService, private _config: NgbAccordionConfig, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private headquartersService: HeadquartersService) {

    this.route.params.subscribe(params => {
      this.id=params.id;
    });
    this.HeadquarterForm = this.fb.group({
      nameHeadquarter: ['', Validators.required],
      addressHQ: [''],
      telephoneNumber: [''],
      company_idCompany: [this.id]
    });

    this.HeadquarterUpdateForm = this.fb.group({
      nameHeadquarter: ['', Validators.required],
      addressHQ: [''],
      telephoneNumber: [''],
      company_idCompany: [this.id]
    });
   }

  ngOnInit(): void {
    this.url=this.router.url.split('/')[1]
    console.log(this.url);
    this.route.params.subscribe(params => {
      this.id=params.id;
      this.getHeadquarters();
    });
    if (this.url === 'headquarters') {
      this.nav.show();
    }else{
      this.nav.hide();
    }
  }

  goBack(){
    this._location.back();
  }
 

  getHeadquarters() {
    this.headquartersService.getheadquarterByIDCompany(this.id).subscribe(
      (data: any) => {
        this.dataHeadquarters=data.dataHeadquarter
      },
      err => {
        console.log(err);
      }
    )
  }

  saveForm() {
    if (this.HeadquarterForm.valid === true) {
      this.headquartersService.createHeadquarter(this.HeadquarterForm.value).subscribe(
        (data:any) => {
          console.log(data)
          this.getHeadquarters();
        },
        err => console.log(err)
      )
    }
  }

  getHeadquarter(id:any) {
    this.headquartersService.getHeadquarterById(id).subscribe(
      (data: any) => {
        this.dataHeadquarter=data.dataHeadquarter
      },
      err => {
        console.log(err);
      }
    )
  }

  updateHeadquarter(id:any) {
    this.headquartersService.updateHeadquarter(this.HeadquarterUpdateForm.value, id).subscribe(
      (data: any) => {
        this.getHeadquarters();
      },
      err => {
        console.log(err);
      }
    )
  }

  getValue(value: string) {
    return this.HeadquarterForm.get(value)
  }

  deleteHeadquarter(id:any) {
    Swal.fire({
      title: '¿Estas Seguro de eliminar la sede?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.headquartersService.deleteHeadquarter(id).subscribe(
          (data:any) => {
            Swal.fire(
              'Sede Eliminado',
              'Su sede ha sido eliminada correctamente.',
              'success'
            )
            this.getHeadquarters();
          },
          err => console.log(err)
        )
      }
    })
  }

  addPeople(id: string) {
    this.router.navigate([`/headquarter/${id}`]);
  }

  continue(){
    this.userService.updateUserAdminIsConfigFull(localStorage.getItem('idUserAdmin')).subscribe(
      (data:any) => {
        this.router.navigate(['/']);
      },
      err => console.log(err)
    )
  }
}
