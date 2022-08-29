import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { NoReturnRouteGuard } from './guard/no-return-route.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guard/auth.guard';
import { PageValidateComponent } from './components/page-validate/page-validate.component';



const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [NoReturnRouteGuard]},
  { path: 'login/:token', component: PageValidateComponent, canActivate: [NoReturnRouteGuard]},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
