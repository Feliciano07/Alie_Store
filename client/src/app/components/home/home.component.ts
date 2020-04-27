import { Component, OnInit } from '@angular/core';
import {Empresa} from '../../models/Empresa';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  empresa: Empresa = {
      name : 'Alie Shell',
      slogan: 'Store online',
      image: 'http://localhost:8080/nombre_empresa.png',
      video : 'youtube.com',
      mission: 'Alie Shell tienda online comprometida con brindar el mejor servicio',
      vision: 'Alie Shell tienda online comprometida con brindar el mejor servicio y Ser los mejores',
      about: 'Acerca de '
  };

  constructor() { }

  ngOnInit(): void {
  }

}
