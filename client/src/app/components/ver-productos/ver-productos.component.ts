import { Component, OnInit } from '@angular/core';

import {ProductoService} from '../../services/producto.service';
import { isNullOrUndefined } from 'util';

import {Router} from '@angular/router';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.component.html',
  styleUrls: ['./ver-productos.component.css']
})
export class VerProductosComponent implements OnInit {

  productos: any = [];

  userSession: any;

  constructor(private productoService: ProductoService, private router: Router) { }

  ngOnInit(): void {
    this.Verificar_Cliente();
    this.Cargar_Productos();
  }

  Verificar_Cliente(){
    const dato = localStorage.getItem('user');
    if (!isNullOrUndefined(dato)){
        const user = JSON.parse(dato);
        if (user.TIPO_USUARIO === 1 || user.TIPO_USUARIO === 2){
            this.userSession = user ;
        }else{
          this.router.navigate(['/error']);
        }
    }else{
      this.router.navigate(['home']);
    }
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
