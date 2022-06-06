import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NavbarService } from '../../services/navbar.service';

declare var jQuery: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  ifToken:any

  constructor(
    public userService: UserService,
    public nav: NavbarService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('tokenSuperU')) {
      this.ifToken=true
    }
  }
  
  backNav(){
    jQuery('.navbar-nav>li').on('click', function(){
      jQuery('.navbar-collapse').collapse('hide');
  });
  }

  backNavLg(){
    jQuery('.collapse>button').on('click', function(){
      jQuery('.navbar-collapse').collapse('hide');
    });
  }
  logOut() {
    this.backNavLg();
    this.userService.logout();
  }
}