import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HeadquartersService } from '../../services/headquarters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  usuario: any;
  id: any;
  dataHeadquarters: any;

  constructor(
    private headquartersService:HeadquartersService,
    private userService:UserService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {
    this.route.params.subscribe(params => {
      this.id=params.id;
    });
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id=params.id;
    });
    this.getHeadQ();
  }


  getHeadQ(){
    this.headquartersService.getheadquarterByIDCompany(this.id).subscribe(
      (data:any)=> {
        this.dataHeadquarters=data.dataHeadquarter
        console.log(this.dataHeadquarters);
      },
      err => console.log(err)
    )
  }

  getModelos(id: any){
    this.router.navigate([`modelsByHeadquarter/${id}`]);
  }
  goBack(){
    this._location.back();
  }
}
