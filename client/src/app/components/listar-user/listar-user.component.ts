import { Component, OnInit } from '@angular/core';

import {ToastrService} from 'ngx-toastr';


import {AdminService} from '../../services/admin.service';
import { Check } from 'src/app/models/Usuario';

@Component({
  selector: 'app-listar-user',
  templateUrl: './listar-user.component.html',
  styleUrls: ['./listar-user.component.css']
})
export class ListarUserComponent implements OnInit{

  public usuarios: any = []; // arreglo de usuarios existentes

  updateUser: any;


  opciones: any = {
    texto : '',
    texto_btn: '',
    disable: false,
    open: 0
  };

  check: Check = {
    value1: '0',
  };

  razon = '';

  data: any = {
    id_usuario: -1,
    tipo_usuario: -1,
    razon: ''
  };


  constructor(private adminService: AdminService, private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.LoadUser();
  }


  LoadUser(): void{
    this.adminService.Listar_Usuarios().subscribe(
      res => {
        this.usuarios = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  Obtener(item){
    this.updateUser = item;
  }

  Obtener_Asc(item){
    this.updateUser = item;
    this.opciones.disable = false;
    this.opciones.texto_btn = 'Guarda Datos';

    this.opciones.texto = 'Ascender Usuario';
    this.opciones.open = 0;

    if (item.TIPO_USUARIO === 0){
      this.opciones.disable = true;
      this.opciones.texto_btn = 'No se Puede Ascender';
    }
  }

  Obtener_Desc(item){
    this.updateUser = item;

    this.opciones.disable = false;
    this.opciones.texto_btn = 'Guarda Datos';

    this.opciones.texto = 'Descender Usuario';
    this.opciones.open = 1;

    if (item.TIPO_USUARIO === 2){
      this.opciones.disable = true;
      this.opciones.texto_btn = 'No se Puede Descender';
    }
  }


  Define_Cambio(): void{
    if (this.check.value1 === '0') {
      this.data.tipo_usuario = 0;
    }else if (this.check.value1 === '1'){
      this.data.tipo_usuario = 1;
    }else if (this.check.value1 === '2'){
      this.data.tipo_usuario = 2;
    }
  }

  Validaciones(){

    this.Define_Cambio();

    if (this.razon !== ''){
        if (this.data.tipo_usuario !== this.updateUser.TIPO_USUARIO){
          this.Guardar();
        }else{
          this.toast.warning('El usuario ya forma parte de categoria seleccionada', 'Operacion Fallida');
        }
    }else{
      this.toast.warning('Debe escribir una razon', 'Operacion Fallida');
    }
  }


  Guardar(){

    this.data.id_usuario = this.updateUser.ID_USUARIO;
    this.data.razon = this.razon;


    if (this.opciones.open === 0){
        this.adminService.Ascender(this.data).subscribe(
            res => {
              console.log(res);
              this.toast.success('Usuario Ascendido con Exito', 'Exito!');
            },
            err => {

            }
        );
    }else{
        this.adminService.Descender(this.data).subscribe(
          res => {
              console.log(res);
              this.toast.success('Usuario Descendido con Exito', 'Exito!');
          },
          err => {

          }
        );
    }
  }


  CambiarDatos(){

    this.adminService.Update(this.updateUser).subscribe(
      res => {
        this.toast.success('Usuario Modificado', 'Success');
        this.ngOnInit();
      },
      err => {
        this.toast.error('No se logro modificar el usuario', 'Error');
        console.log(err);
      }
    );

  }

}
