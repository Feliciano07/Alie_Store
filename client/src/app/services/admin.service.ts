import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';

import {Usuario} from '../models/Usuario';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private API_URI = 'http://localhost:3000/api/admin';

  constructor(private http: HttpClient) { }


  SaveUser(user: any){
    return this.http.post(`${this.API_URI}/crear`, user);
  }

  Listar_Usuarios(){
    return this.http.get(`${this.API_URI}/listar`);
  }

  Update(user){
    return this.http.post(`${this.API_URI}/update`, user);
  }

  Ayuda_Year(data){
    return this.http.post(`${this.API_URI}/ayuda`, data);
  }

  Admin_Year(data){
    return this.http.post(`${this.API_URI}/admin`, data);
  }

  Disponibles(data){
    return this.http.post(`${this.API_URI}/cantidad`, data);
  }

  Promedio(){
    return this.http.get(`${this.API_URI}/promedio`);
  }

  Top_Clientes(){
    return this.http.get(`${this.API_URI}/top`);
  }

  All_Productos(){
    return this.http.get(`${this.API_URI}/productos`);
  }

  Ascender(data){
    return this.http.post(`${this.API_URI}/asc`, data);
  }

  Descender(data){
    return this.http.post(`${this.API_URI}/desc`, data);
  }
}
