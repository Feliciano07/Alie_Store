import { Component, OnInit } from '@angular/core';

import {AdminService} from '../../../services/admin.service';

import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cantidad-disponible',
  templateUrl: './cantidad-disponible.component.html',
  styleUrls: ['./cantidad-disponible.component.css']
})
export class CantidadDisponibleComponent implements OnInit {

  cantidad = 0;

  listPro: any = [];

  constructor(private adminService: AdminService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  Buscar(){

    const data = {
      cantidad : this.cantidad
    };

    this.adminService.Disponibles(data).subscribe(
      res => {
        this.listPro = res;
        this.toast.info('Busquedad Terminada', 'Informacion');
      },
      err => {

      }
    );

  }

}
