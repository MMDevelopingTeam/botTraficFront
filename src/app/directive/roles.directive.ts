import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[appRoles]'
})
export class RolesDirective implements OnInit{

  private currentUser: any;
  private permissions= [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getInfoUser().subscribe(
      (data: any) => {
        this.currentUser=data.dataUser;
        this.updateView();
      }
    )
  }

  @Input()
  set appRoles(val: any){
    console.log('****', val);
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.permissions=val;
    this.updateView();
  }

  updateView(){
    this.viewContainer.clear()
  }

}
