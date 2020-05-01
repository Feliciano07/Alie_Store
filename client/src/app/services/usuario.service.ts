import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';

import {Usuario} from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API_URI = 'http://localhost:3000/api/usuario';

  constructor(private http: HttpClient) {

   }

   getUsers(){
     return this.http.get(`${this.API_URI}`);
   }

   SaveUsuario(user: Usuario){
      return this.http.post(`${this.API_URI}/singup`, user);
   }

   Obtener_Usuario(user: Usuario){
      return this.http.post(`${this.API_URI}/login`, user);
   }

   Cambiar_Pass(correo){
     return this.http.post(`${this.API_URI}/recuperacion`,  correo);
   }

}
