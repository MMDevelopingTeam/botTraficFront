import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

declare var jQuery: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
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