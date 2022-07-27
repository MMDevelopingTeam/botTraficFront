import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from 'src/app/guard/user.guard';
import { UserComponent } from './user/user.component';
import { ViewPlatformComponent } from './user/view-platform/view-platform.component';

const routes: Routes = [
  { path: 'dashboard/user', component: UserComponent, canActivate: [UserGuard] },
  { path: 'dashboard/user/chaturbate', component: ViewPlatformComponent, canActivate: [UserGuard] },
  { path: 'dashboard/user/stripchat', component: ViewPlatformComponent, canActivate: [UserGuard] },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
