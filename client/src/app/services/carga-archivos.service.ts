import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CargaArchivosService {


  API_URI = 'http://localhost:3000/api/carga';

  constructor(private http: HttpClient) { }

  // peticion que envia archivo foto
  subir_foto(data){
    return this.http.post(`${this.API_URI}/foto`, data);
  }

  Subir_Productos(data){
    return this.http.post(`${this.API_URI}/productos`, data);
  }

}
