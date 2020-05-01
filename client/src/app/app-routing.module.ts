import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {ConfirmarCorreoComponent} from './components/confirmar-correo/confirmar-correo.component';
import { NagivationClienteComponent } from './components/nagivation-cliente/nagivation-cliente.component';

import { ChatComponent } from './components/chat/chat.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { AdminComponent } from './components/admin/admin.component';
import { RecuperacionComponent } from './components/recuperacion/recuperacion.component';
import { ListarUserComponent } from './components/listar-user/listar-user.component';
import { CrearUserComponent } from './components/crear-user/crear-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path : 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'recuperar',
    component: RecuperacionComponent
  },
  {
    path: 'singUp',
    component: SignUpComponent
  },
  {
    path: 'confirmacion/:correo',
    component: ConfirmarCorreoComponent
  },
  {
    path: 'cliente',
    component: ClienteComponent
  },
  {
    path: 'soporte',
    component: ChatComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'admin/listar',
    component: ListarUserComponent
  },
  {
    path: 'admin/crear',
    component: CrearUserComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
