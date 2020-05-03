import { Component, OnInit } from '@angular/core';

import {AdminService} from '../../../services/admin.service';

import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-top-clientes',
  templateUrl: './top-clientes.component.html',
  styleUrls: ['./top-clientes.component.css']
})
export class TopClientesComponent implements OnInit {

  lisTop: any = [];

  constructor(private adminService: AdminService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  Buscar(){
    this.adminService.Top_Clientes().subscribe(
      res => {
        this.lisTop = res ;
        this.toast.info('Se ha finalizado la Busquedad', 'informacion');
      },
      err => {

      }
    );
  }
}
