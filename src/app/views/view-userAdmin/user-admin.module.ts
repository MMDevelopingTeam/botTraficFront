import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAdminRoutingModule } from './user-admin-routing.module';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { CompanyUserAdminComponent } from './company-user-admin/company-user-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModelsComponent } from './models/models.component';
import { AllowedDevicesComponent } from './allowed-devices/allowed-devices.component';


@NgModule({
  declarations: [
    UserAdminComponent,
    CreateUsersComponent,
    CompanyUserAdminComponent,
    ModelsComponent,
    AllowedDevicesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UserAdminRoutingModule,
    NgxPaginationModule
  ]
})
export class UserAdminModule { }
