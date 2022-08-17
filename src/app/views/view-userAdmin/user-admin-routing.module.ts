import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';
import { UserAdminGuard } from 'src/app/guard/user-admin.guard';
import { ModelsComponent } from '../view-userAdmin/models/models.component';
import { AllowedDevicesComponent } from './allowed-devices/allowed-devices.component';
import { CompanyUserAdminComponent } from './company-user-admin/company-user-admin.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { UserAdminComponent } from './user-admin/user-admin.component';

const routes: Routes = [
  {path: 'dashboard/userAdmin', component: UserAdminComponent, canActivate: [UserAdminGuard]},
  {path: 'dashboard/userAdmin/notifications', component: NotificationsComponent, canActivate: [UserAdminGuard]},
  {path: 'company/:id', component: CompanyUserAdminComponent, canActivate: [UserAdminGuard]},
  {path: 'company/users/:id', component: CreateUsersComponent, canActivate: [UserAdminGuard]},
  {path: 'users', component: CreateUsersComponent, canActivate: [UserAdminGuard]},
  {path: 'models/:id', component: ModelsComponent, canActivate: [UserAdminGuard]},
  {path: 'devices/:id', component: AllowedDevicesComponent, canActivate: [UserAdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAdminRoutingModule { }
