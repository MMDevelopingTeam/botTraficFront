import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from 'src/app/guard/user.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'dashboard/user', component: UserComponent, canActivate: [UserGuard] },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
