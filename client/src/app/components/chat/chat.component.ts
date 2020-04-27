import { Component, OnInit } from '@angular/core';

import {ChatService} from '../../services/chat.service';

import {ToastrService} from 'ngx-toastr';











@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],

})
export class ChatComponent implements OnInit {

  user: any; // type usuario


  conversacion: any = [] ; // type conversacion

  listMensaje: any = [];



  userActual: string; // usuario actual para hablar

  sala: any = [];

  mensajeEnviado: string;

  SalasOcupadas: any = []; // datos que guarda las salas_ocupadas
  allAyuda: any = []; // datos que guardar todos los usuarios ayuda

  puntuaciones: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  valoracion: string;



  // tslint:disable-next-line:max-line-length
  constructor(private chatService: ChatService, private toastr: ToastrService) {

    this.chatService.newUserJoined()
    .subscribe(data => this.listMensaje.push(data));

    this.chatService.newMessageReceived()
    .subscribe(data => this.listMensaje.push(data));



  }



  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));


    const idenUsuario = {
      id_usuario: this.user.ID_USUARIO
    };

    // load rooms;
    if (this.user.TIPO_USUARIO === 1){ // tipo ayuda
        this.Load_Rooms_Ayuda(idenUsuario);
    }else if (this.user.TIPO_USUARIO === 0){ // tipo cliente
      this.Load_Rooms_Cliente(idenUsuario);
    }


  }

  capturar(){

    const punteo = parseInt(this.valoracion, 10);

    const fin = {
      puntos: punteo,
      id_sala: this.sala.id_sala
    };

    console.log(fin);

    if (punteo > 0){
      this.chatService.Problema_Solucionado(fin)
    .subscribe(
      res => {
          this.toastr.success('Se ha enviado su calificacion', 'Informacion:');
          this.ngOnInit();
      },
      err => {

      }
    );
    }else{
      this.toastr.warning('No se ha dado un puteo', ' Informacion!');
    }

  }

  Nuevo_Chat(){

    if (this.conversacion.length > 0 ){
      this.toastr.error('Solo puede poseer una conversacion activa', 'Informacion');
    }else{
      this.chatService.Salas_Ayuda()
      .subscribe(
        res => {
           console.log(res);
           this.SalasOcupadas = res;
        },
        err => {
          console.log(err);
        }
      );

      this.chatService.Get_Usuario_Ayuda()
      .subscribe(
        res => {
          console.log(res);
          this.allAyuda = res;
        },
        err => {
            console.log(err);
        }
      );

      this.Asigar_Ayuda_Desocupada();
    }


  }

  Asigar_Ayuda_Desocupada(){
    let encontre = false;
    let i = 0;
    // tslint:disable-next-line:prefer-for-of
    for (i = 0; i < this.allAyuda.length ; i++){

        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < this.SalasOcupadas.length ; j++){

            if (this.allAyuda[i].ID_USUARIO === this.SalasOcupadas[j].ID_USUARIO){
                encontre = true;
            }
        }
        if (encontre === false){
            break;
        }else{
          encontre = false;
        }
    }
    if (encontre === false && i < this.allAyuda.length){
        this.Nueva_Sala(this.allAyuda[i].ID_USUARIO);
    }else{
        this.Asigar_Ayuda_Ocupada();
    }
  }

  Asigar_Ayuda_Ocupada(){
    // tslint:disable-next-line:prefer-for-of
    let idActual = -1;
    for (let j = 0; j < this.SalasOcupadas.length ; j++){

      if (j + 1 < this.SalasOcupadas.length){
        if (this.SalasOcupadas[j].NUMERO <= this.SalasOcupadas[j + 1].NUMERO){
            idActual = this.SalasOcupadas[j].NUMERO;
        }else{
          idActual = this.SalasOcupadas[j + 1].NUMERO;
        }
      }
    }

    if (idActual !== -1){
      this.Nueva_Sala(idActual);
    }else{
      this.toastr.warning('No se logro crear la sala', 'Atencion');
    }
  }

  Nueva_Sala(ayuda: number){
    const sala = {
      id_cliente: this.user.ID_USUARIO,
      id_ayuda: ayuda
    };

    this.chatService.Guardar_Sala(sala)
    .subscribe(
      res => {
        console.log(res);
        this.toastr.success('Se ha enviado su peticion ayuda, refresque para interactuar', 'Exito');
      },
      err => {
        console.log(err);
      }
    );

  }



  Load_Rooms_Cliente(idUser: any){
    this.chatService.Chat_Salas_Cliente(idUser)
    .subscribe(
        res => {
          // console.log(res);
          this.conversacion = res;
        },
        err => {
          console.log(err);
        }
    );
  }
  Load_Rooms_Ayuda(idUser: any){
    this.chatService.Chat_Salas_Ayuda(idUser)
    .subscribe(
      res => {
        console.log(res);
        this.conversacion = res;
      },
      err => {
        console.log(err);
      }
    );
  }



  Cambiar_Sala(item: any){

    this.sala = {
      id_sala: item.ID_SALA,
      usuario: ''
    };

    this.userActual = item.NOMBRE;
    this.join();

    this.chatService.Get_Mensajes(this.sala)
      .subscribe(
          res => {
              // console.log(res);
              this.listMensaje = res;

          },
          err => {
            console.log(err);
          }
      );
  }

  // manejo del chat

  join(){
    this.chatService.joinRoom({
      nombre: this.user.NOMBRE,
      id_sala: this.sala.id_sala
    });
  }

  sendMessage(){

    this.chatService.Guardar_Mensaje({
        id_usuario: this.user.ID_USUARIO,
        sala: this.sala.id_sala,
        mensaje: this.mensajeEnviado
    }).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

    this.chatService.SendMessage({
        nombre: this.user.NOMBRE,
        id_sala: this.sala.id_sala,
        mensaje: this.mensajeEnviado
      });

    this.mensajeEnviado = '';
  }

}
