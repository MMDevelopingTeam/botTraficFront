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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [NoReturnRouteGuard]},
  { path: 'register', component: LoginComponent, canActivate: [NoReturnRouteGuard]},
  { path: 'company/:id', component: CreateCompanyComponent},
  { path: 'models/:id', component: ModelsComponent},
  { path: 'modelsByHeadquarter/:id', component: ModelsHeadQComponent},
  { path: 'headquarter/:id', component: HeadquartersComponent},
  { path: 'headquarters/:id', component: CreateHeadquartersComponent},
  { path: 'company/headquarter/:id', component: CreateHeadquartersComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
