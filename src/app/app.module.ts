import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CompanyComponent } from './views/company/company.component';
import { CreateCompanyComponent } from './views/company/create-company/create-company.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeadquartersComponent } from './views/headquarters/headquarters.component';
import { CreateHeadquartersComponent } from './views/headquarters/create-headquarters/create-headquarters.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { RolesDirective } from './directive/roles.directive';

// ngBoostrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModelsComponent } from './views/models/models.component';
import { ModelsHeadQComponent } from './views/models/models-head-q/models-head-q.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserModule } from './views/view-user/user.module';
import { SuperUserModule } from './views/view-superUser/super-user.module';
import { UserAdminModule } from './views/view-userAdmin/user-admin.module';
import { FilterModelPipe } from './pipes/filter-model.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    CompanyComponent,
    CreateCompanyComponent,
    PageNotFoundComponent,
    HeadquartersComponent,
    CreateHeadquartersComponent,
    RolesDirective,
    ModelsComponent,
    ModelsHeadQComponent,
    FilterModelPipe
  ],
  imports: [
    UserModule,
    SuperUserModule,
    UserAdminModule,


    AppRoutingModule,


    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ name: 'TEST' }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
