import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';


import {UsuarioService} from './services/usuario.service';

import { ConfirmarCorreoComponent } from './components/confirmar-correo/confirmar-correo.component';
import { NavigationLoginComponent } from './components/navigation-login/navigation-login.component';
import { NagivationClienteComponent } from './components/nagivation-cliente/nagivation-cliente.component';

import { ChatService } from './services/chat.service';
import { ChatComponent } from './components/chat/chat.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './components/admin/admin.component';
import { NavigationAdminComponent } from './components/navigation-admin/navigation-admin.component';
import { RecuperacionComponent } from './components/recuperacion/recuperacion.component';
import { ListarUserComponent } from './components/listar-user/listar-user.component';
import { CrearUserComponent } from './components/crear-user/crear-user.component';
import { AdminService } from './services/admin.service';
import { CargaArchivosService } from './services/carga-archivos.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    ConfirmarCorreoComponent,
    NavigationLoginComponent,
    NagivationClienteComponent,
    ChatComponent,
    ClienteComponent,
    AdminComponent,
    NavigationAdminComponent,
    RecuperacionComponent,
    ListarUserComponent,
    CrearUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    }),
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    UsuarioService,
    ChatService,
    AdminService,
    CargaArchivosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
