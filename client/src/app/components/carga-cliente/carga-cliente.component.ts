import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';

import {CargaArchivosService} from '../../services/carga-archivos.service';


@Component({
  selector: 'app-carga-cliente',
  templateUrl: './carga-cliente.component.html',
  styleUrls: ['./carga-cliente.component.css']
})
export class CargaClienteComponent implements OnInit {

  uploadFile: Array<File>;
  productos: any = [];

  userSession: any;

  constructor(private ngxCsvParser: NgxCsvParser, private toast: ToastrService, private cargaService: CargaArchivosService) { }

  ngOnInit(): void {
    this.userSession = JSON.parse(sessionStorage.getItem('user'));
  }

  onEvent(e){
    const files = e.target.files;

    this.ngxCsvParser.parse(files[0], { header: true, delimiter: ',' })
      .pipe().subscribe((result: any) => {

        console.log('Result', result);
        this.productos = result;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }

  Cargar_Producto(){
    if (this.productos.length > 0){

      this.productos.forEach(element => {

         const dato = {
           productos: element,
           id_usuario: this.userSession.ID_USUARIO
         };

         this.cargaService.Subir_Productos(dato).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );

      });

      this.toast.info('Productos Cargados', 'Success');
      this.productos = [];

    }else{
      this.toast.error('No ha cargado un archivo aun', 'Atencion');
    }
  }

}
