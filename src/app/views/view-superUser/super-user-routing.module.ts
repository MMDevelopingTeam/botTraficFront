import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperUserGuard } from 'src/app/guard/super-user.guard';
import { BotContainersComponent } from './bot-containers/bot-containers.component';
import { ProxysComponent } from './bot-containers/proxys/proxys.component';
import { CompanysComponent } from './companys/companys.component';
import { UsersComponent } from './companys/users/users.component';
import { LicensesComponent } from './licenses/licenses.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { PlatformsComponent } from './platforms/platforms.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SuperUserComponent } from './super-user/super-user.component';
import { UserTypesComponent } from './user-types/user-types.component';

const routes: Routes = [
  { path: 'dashboard/superUser', component: SuperUserComponent, canActivate: [SuperUserGuard] },
  { path: 'dashboard/superUser/companys', component: CompanysComponent, canActivate: [SuperUserGuard] },
  { path: 'dashboard/superUser/companys/:id/users', component: UsersComponent, canActivate: [SuperUserGuard] },
  { path: 'dashboard/superUser/botContainers', component: BotContainersComponent, canActivate: [SuperUserGuard] },
  { path: 'dashboard/superUser/botContainers/:id/proxys', component: ProxysComponent, canActivate: [SuperUserGuard] },
  { path: 'dashboard/superUser/platforms', component: PlatformsComponent, canActivate: [SuperUserGuard] },
  { path: 'dashboard/superUser/licenses', component: LicensesComponent, canActivate: [SuperUserGuard] },
  { path: 'dashboard/superUser/userTypes', component: UserTypesComponent, canActivate: [SuperUserGuard] },
  { path: 'dashboard/superUser/permissions', component: PermissionsComponent, canActivate: [SuperUserGuard] },
  { path: 'dashboard/superUser/statistics', component: StatisticsComponent, canActivate: [SuperUserGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperUserRoutingModule { }
