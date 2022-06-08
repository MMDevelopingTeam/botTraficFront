import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperUserRoutingModule } from './super-user-routing.module';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { SuperUserComponent } from './super-user/super-user.component';
import { CompanysComponent } from './companys/companys.component';
import { BotContainersComponent } from './bot-containers/bot-containers.component';
import { PlatformsComponent } from './platforms/platforms.component';
import { LicensesComponent } from './licenses/licenses.component';
import { UserTypesComponent } from './user-types/user-types.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { UsersComponent } from './companys/users/users.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProxysComponent } from './bot-containers/proxys/proxys.component';


@NgModule({
  declarations: [
    SuperUserComponent,
    CompanysComponent,
    BotContainersComponent,
    PlatformsComponent,
    LicensesComponent,
    UserTypesComponent,
    PermissionsComponent,
    UsersComponent,
    StatisticsComponent,
    ProxysComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    SuperUserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SuperUserModule { }
