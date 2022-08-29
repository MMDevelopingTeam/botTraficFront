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
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { RolesDirective } from './directive/roles.directive';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// ngBoostrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserModule } from './views/view-user/user.module';
import { SuperUserModule } from './views/view-superUser/super-user.module';
import { UserAdminModule } from './views/view-userAdmin/user-admin.module';
import { FilterModelPipe } from './pipes/filter-model.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from 'src/environments/environment.prod';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PageValidateComponent } from './components/page-validate/page-validate.component';

const config: SocketIoConfig = { 
  url: environment.urlSockets, 
  options: {
    withCredentials: true,
    autoConnect: true
  } 
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    PageNotFoundComponent,
    RolesDirective,
    FilterModelPipe,
    NotificationsComponent,
    PageValidateComponent
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
    SocketIoModule.forRoot(config)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
