import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public userService: UserService,
    public nav: NavbarService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.nav.show();
  }

  redirect(){
    if (localStorage.getItem('idUser')) {
      this.router.navigate(['/dashboard/user']);
    }else if (localStorage.getItem('idUserAdmin')) {
      this.router.navigate(['/dashboard/userAdmin']);
    }else if (localStorage.getItem('idSuperUser')) {
      this.router.navigate(['/dashboard/superUser']); 
    }
  }
}
