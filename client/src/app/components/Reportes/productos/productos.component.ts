import { Component, OnInit } from '@angular/core';

import {AdminService} from '../../../services/admin.service';

import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  listProducto: any = [];

  constructor(private adminService: AdminService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  Buscar(){
    this.adminService.All_Productos().subscribe(
      res => {
        this.listProducto = res ;
        this.toast.info('Se termino la Busquedad', 'informacion');
      },
      err => {

      }

    );
  }

}
