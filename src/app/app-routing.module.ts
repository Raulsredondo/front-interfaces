import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvListComponent } from './components/prov-list/prov-list.component';
import { ProvFormComponent } from './components/prov-form/prov-form.component';
import { ProdListComponent } from './components/prod-list/prod-list.component';
import { ProdFormComponent } from './components/prod-form/prod-form.component';
import { ClientesListComponent } from './components/clientes-list/clientes-list.component';
import { ClientesFormComponent } from './components/clientes-form/clientes-form.component';
import { PresupuestosListComponent } from './components/presupuestos-list/presupuestos-list.component';
import { PresupuestosFormComponent } from './components/presupuestos-form/presupuestos-form.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './components/auth/auth.guard';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/proveedores',
    pathMatch: 'full'
  },
  {
    path: 'proveedores',
    canActivate: [AuthGuard],
    component: ProvListComponent
  },
  {
    path: 'proveedores/add',
    canActivate: [AuthGuard],
    component: ProvFormComponent
  },
  {
    path: 'proveedores/edit/:id',
    canActivate: [AuthGuard],
    component: ProvFormComponent
  },
  {
    path: 'productos',
    canActivate: [AuthGuard],
    component: ProdListComponent
  },
  {
    path: 'productos/add',
    canActivate: [AuthGuard],
    component: ProdFormComponent
  },
  {
    path: 'productos/edit/:id',
    canActivate: [AuthGuard],
    component: ProdFormComponent
  },
  {
    path: 'clientes',
    canActivate: [AuthGuard],
    component: ClientesListComponent
  },
  {
    path: 'clientes/add',
    canActivate: [AuthGuard],
    component: ClientesFormComponent
  },
  {
    path: 'clientes/edit/:id',
    canActivate: [AuthGuard],
    component: ClientesFormComponent
  },
  {
    path: 'presupuestos',
    canActivate: [AuthGuard],
    component: PresupuestosListComponent
  },
  {
    path: 'presupuestos/add',
    canActivate: [AuthGuard],
    component: PresupuestosFormComponent
  },
  {
    path: 'presupuestos/edit/:id',
    canActivate: [AuthGuard],
    component: PresupuestosFormComponent
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: UsersListComponent,
    data: { title: 'users' }
  },
  {
    path: 'users/add',
    canActivate: [AuthGuard],
    component: UsersFormComponent
  },
  {
    path: 'edit-user/:id',
    
    component: EditUserComponent,
    data: { title: 'Edit User' }
  },
  {
    path: 'users/edit/:id',
    canActivate: [AuthGuard],
    component: UsersFormComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' }
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

