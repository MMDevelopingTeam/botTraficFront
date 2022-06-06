import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { NoReturnRouteGuard } from './guard/no-return-route.guard';
import { CreateCompanyComponent } from './views/company/create-company/create-company.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CreateHeadquartersComponent } from './views/headquarters/create-headquarters/create-headquarters.component';
import { HeadquartersComponent } from './views/headquarters/headquarters.component';
import { ModelsComponent } from './views/models/models.component';
import { ModelsHeadQComponent } from './views/models/models-head-q/models-head-q.component';
import { SuperUserComponent } from './views/view-superUser/super-user/super-user.component';
import { AuthGuard } from './guard/auth.guard';



const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [NoReturnRouteGuard]},
  { path: 'company/:id', component: CreateCompanyComponent, canActivate: [AuthGuard]},
  { path: 'models/:id', component: ModelsComponent, canActivate: [AuthGuard]},
  { path: 'dashboardSuperU', component: SuperUserComponent, canActivate: [AuthGuard]},
  { path: 'modelsByHeadquarter/:id', component: ModelsHeadQComponent, canActivate: [AuthGuard]},
  { path: 'headquarter/:id', component: HeadquartersComponent, canActivate: [AuthGuard]},
  { path: 'headquarters/:id', component: CreateHeadquartersComponent, canActivate: [AuthGuard]},
  { path: 'company/headquarter/:id', component: CreateHeadquartersComponent, canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
