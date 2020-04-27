import { Component, OnInit } from '@angular/core';
import { Usuario, Check } from 'src/app/models/Usuario';
import {UsuarioService} from '../../services/usuario.service';
import { CargaArchivosService } from '../../services/carga-archivos.service';
import {Router} from '@angular/router';

import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  usuario: Usuario = {
    nombre: '',
    apellido: '',
    clave: '',
    correo: '',
    telefono: 0,
    foto: 'https://as01.epimg.net/meristation/imagenes/2019/03/20/header_image/673481751553105184.jpg',
    direccion: '',
    credito: 0,
    ganancia: 0,
    clase_cliente: -1,
    genero: -1,
    tipo_usuario: 2, // class user
    fecha_nacimiento: new Date()
  };

  check: Check = {
    value1: '0',
  };

  conf: any ;

  nameFile: any ;

  execSuccess = false;

  ServeImage = 'http://localhost:8080/';

  uploadFile: Array<File>;

  constructor(private usuarioService: UsuarioService, private tosastr: ToastrService, private router: Router,
    // tslint:disable-next-line:align
    private cargarService: CargaArchivosService) {

  }

  ngOnInit(): void {
    this.usuarioService.getUsers().subscribe(
      res => console.log(res),
      er => console.log(er)
    );
  }

  NewUser(): void{

    this.Obtener_Cliente();
    this.Define_Genero();

    this.usuario.foto = this.ServeImage + this.nameFile.filename;

    this.usuarioService.SaveUsuario(this.usuario)
        .subscribe(
            res => {
              this.conf =  res;
              if (this.conf.valor === '1'){
                 this.router.navigate(['/confirmacion', this.usuario.correo]);
              }else{
                 this.ShowError();
              }
            },
            err => {
              console.log(err);
              this.ShowError();
            }
      );

  }

    // metodo que hace la solicitud para guardar
  cargar_Usuario(){

      const formData = new FormData();
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.uploadFile.length; i++){
        formData.append('foto', this.uploadFile[i], this.uploadFile[i].name);
      }
      this.cargarService.subir_foto(formData)
      .subscribe(
        res => {
            this.nameFile = res;
            this.NewUser();
        },
        err => {
          console.log(err);
          this.tosastr.error('No se logro crear el usuario', 'Atencion');
        }
      );

  }




  //  function que guarda el evento de la carga de archivo
  onEvent(e): void{
    this.uploadFile = e.target.files;
  }



  Obtener_Cliente(): void{

    this.usuario.clase_cliente = Math.floor(Math.random() * (4) + 0);

    switch (this.usuario.clase_cliente){
        case 0:
          this.usuario.credito = 50000;
          break;
        case 1:
            this.usuario.credito = 25000;
            break;
        case 2:
          this.usuario.credito = 10000;
          break;
        case 3:
          this.usuario.credito = 5000;
          break;
        case 4:
          this.usuario.credito = 1000;
          break;
    }
  }

  Define_Genero(): void{
    if (this.check.value1 === '0') {
      this.usuario.genero = 0;
    }else{
      this.usuario.genero = 1;
    }
  }

  ShowError(){
    this.tosastr.error('No se puede realizar su registro', 'Error');
  }

}
