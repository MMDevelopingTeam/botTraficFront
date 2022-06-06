import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAdminGuard } from 'src/app/guard/user-admin.guard';
import { UserAdminComponent } from './user-admin/user-admin.component';

const routes: Routes = [
  {path: 'dashboard/userAdmin', component: UserAdminComponent, canActivate: [UserAdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAdminRoutingModule { }
