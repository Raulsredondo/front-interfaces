import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms' 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import {ProvListComponent} from './components/prov-list/prov-list.component';
import { ProvFormComponent } from './components/prov-form/prov-form.component';


// Importar
import { ProvService }  from './services/prov.service';
import { ProdFormComponent } from './components/prod-form/prod-form.component';
import { ProdListComponent } from './components/prod-list/prod-list.component';
import { ClientesFormComponent } from './components/clientes-form/clientes-form.component';
import { ClientesListComponent } from './components/clientes-list/clientes-list.component'
import { ProdService } from './services/prod.service';
import { ClientService } from './services/client.service';
import { PresupuestosListComponent } from './components/presupuestos-list/presupuestos-list.component';
import { PresupuestosFormComponent } from './components/presupuestos-form/presupuestos-form.component';
import { FilterPipe } from './pipes/filter.pipe';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule } from '@angular/material';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AlertComponent } from './components/alert/alert.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProvFormComponent,
    ProvListComponent,
    ProdFormComponent,
    ProdListComponent,
    ClientesFormComponent,
    ClientesListComponent,
    PresupuestosListComponent,
    PresupuestosFormComponent,
    FilterPipe,
    LoginComponent,
    RegisterComponent,
    UsersFormComponent,
    UsersListComponent,
    EditUserComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    ProvService,
    ProdService,
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
