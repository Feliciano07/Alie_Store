import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  API_URI = 'http://localhost:3000/api/producto';

  constructor(private http: HttpClient) { }

  producto_cliente(user){
    return this.http.post(`${this.API_URI}/obtener`, user);
  }

  Search_Producto(data){
    return this.http.post(`${this.API_URI}/buscar`, data);
  }
}
