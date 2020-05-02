import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultado-producto',
  templateUrl: './resultado-producto.component.html',
  styleUrls: ['./resultado-producto.component.css']
})
export class ResultadoProductoComponent implements OnInit {

  productos: any = [];

  item: any = [];

  constructor() { }

  ngOnInit(): void {
    this.productos = JSON.parse(localStorage.getItem('busquedad'));
    localStorage.removeItem('busquedad');
  }

  Obtener(data){
    this.item = data ;
  }

}
