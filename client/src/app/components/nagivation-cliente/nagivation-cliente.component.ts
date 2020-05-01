import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {AdminService} from '../../services/admin.service';


import {ToastrService} from 'ngx-toastr';

import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-nagivation-cliente',
  templateUrl: './nagivation-cliente.component.html',
  styleUrls: ['./nagivation-cliente.component.css']
})
export class NagivationClienteComponent implements OnInit {

  userSession: any ; // contiene informacion usuario

  constructor(private router: Router, private adminService: AdminService, private toast: ToastrService
    // tslint:disable-next-line:align
    , private usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
    this.userSession = JSON.parse(sessionStorage.getItem('user'));
  }


}
