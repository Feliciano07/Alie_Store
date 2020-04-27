import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {Usuario} from '../../models/Usuario';

@Component({
  selector: 'app-nagivation-cliente',
  templateUrl: './nagivation-cliente.component.html',
  styleUrls: ['./nagivation-cliente.component.css']
})
export class NagivationClienteComponent implements OnInit {

  userSession: any ; // contiene informacion usuario

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.userSession = JSON.parse(sessionStorage.getItem('user'));
  }



}
