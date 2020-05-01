import { Component, OnInit } from '@angular/core';
import {Usuario, Check} from '../../models/Usuario';
import {ToastrService} from 'ngx-toastr';

import {UsuarioService} from '../../services/usuario.service';
import {CargaArchivosService} from '../../services/carga-archivos.service';

import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-crear-user',
  templateUrl: './crear-user.component.html',
  styleUrls: ['./crear-user.component.css']
})
export class CrearUserComponent implements OnInit {

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
    tipo_usuario: -1, // class user
    fecha_nacimiento: new Date()
  };

  check: Check = {
    value1: '0',
  };

  checkU: Check = {
    value1: '0',
  };

  nameFile: any ;

  ServeImage = 'http://localhost:8080/';

  uploadFile: Array<File>;

  // tslint:disable-next-line:max-line-length
  constructor(private usuarioService: UsuarioService, private cargarService: CargaArchivosService, private tosastr: ToastrService, private adminService: AdminService) { }

  ngOnInit(): void {
  }

  onEvent(e): void{
    this.uploadFile = e.target.files;
  }

  Define_Genero(): void{
    if (this.check.value1 === '0') {
      this.usuario.genero = 0;
    }else{
      this.usuario.genero = 1;
    }
  }

  Define_Tipo_User(): void {
    if (this.checkU.value1 === '0'){
        this.usuario.tipo_usuario = 1; // tipo ayuda
    }else{
      this.usuario.tipo_usuario = 0; // tipo admin
    }

    if (this.usuario.tipo_usuario === 1){
      this.Obtener_Cliente();
    }
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

  NewUser(): void {
    this.Define_Genero();
    this.Define_Tipo_User();

    this.usuario.foto = this.ServeImage + this.nameFile.filename;

    this.adminService.SaveUser(this.usuario).subscribe(
      res => {
        console.log(res);
        this.tosastr.success('Usuario Creado', 'Exito');
      },
      err => {
        this.tosastr.warning('No se logro crear el usuario', 'Advertencia');
        console.log(err);
      }
    );


    console.log(this.usuario);
  }

  cargar_Usuario(): number{

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
        this.tosastr.warning('No se puede crear el usuario', 'Atencion');
      }
    );

    return 0;
}


}
