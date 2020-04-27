import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import { Usuario } from '../models/Usuario';
import { Sala } from '../models/Sala';


@Injectable({
  providedIn: 'root'
})
export class ChatService {



  private socket = io('http://localhost:3000');

  API_URI = 'http://localhost:3000/api/chat';

  constructor(private http: HttpClient) { }

  joinRoom(data){
    this.socket.emit('join', data); // send room chat
  }

  newUserJoined(){
      const observable = new Observable<{NOMBRE: string, MENSAJE: string}>(observer => {

        this.socket.on('new user joined', (data) => {
            observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      });

      return observable;
  }

  SendMessage(data){
    this.socket.emit('message', data);
  }

  newMessageReceived(){
    const observable = new Observable<{NOMBRE: string, MENSAJE: string}>(observer => {

      this.socket.on('new:message', (data) => {
          observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  }

  // metodos para enviar peticiones de inicio


  Chat_Salas_Cliente(user: Usuario){
    return this.http.post(`${this.API_URI}/chatCliente`, user);
  }

  Chat_Salas_Ayuda(user: Usuario){
    return this.http.post(`${this.API_URI}/chatAyuda`, user);
  }

  Salas_Ayuda(){
    return this.http.get(`${this.API_URI}/salasAyuda`);
  }

  Get_Usuario_Ayuda(){
    return this.http.get(`${this.API_URI}/getUsuarioAyuda`);
  }


  Get_Mensajes(room: any){
    return this.http.post(`${this.API_URI}/getMensajes`, room);
  }

  Guardar_Mensaje(message: any ){
    return this.http.post(`${this.API_URI}/insertarMensaje`, message);
  }

  Guardar_Sala(sala: any){
    return this.http.post(`${this.API_URI}/insertarSala`, sala);
  }

  Problema_Solucionado(sala: any){
    return this.http.post(`${this.API_URI}/solucion`, sala);
  }

}
