import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {ConfirmarCorreoComponent} from './components/confirmar-correo/confirmar-correo.component';
import { NagivationClienteComponent } from './components/nagivation-cliente/nagivation-cliente.component';

import { ChatComponent } from './components/chat/chat.component';
import { ClienteComponent } from './components/cliente/cliente.component';

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
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
