import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatExpansionModule} from '@angular/material/expansion';
import { ViewPlatformComponent } from './user/view-platform/view-platform.component';


@NgModule({
  declarations: [
    UserComponent,
    ViewPlatformComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    MatExpansionModule
  ]
})
export class UserModule { }
