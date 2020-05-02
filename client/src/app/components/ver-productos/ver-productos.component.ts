import { Component, OnInit } from '@angular/core';

import {ProductoService} from '../../services/producto.service';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.component.html',
  styleUrls: ['./ver-productos.component.css']
})
export class VerProductosComponent implements OnInit {

  productos: any = [];

  userSession: any;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.userSession = JSON.parse(sessionStorage.getItem('user'));
    this.Cargar_Productos();
  }

  Cargar_Productos(): void{

      const data = {
        ID_USUARIO: this.userSession.ID_USUARIO
      };

      this.productoService.producto_cliente(data).subscribe(
        res => {
            this.productos = res;
            console.log(this.productos);
        },
        err => {

        }
      );
  }

}
