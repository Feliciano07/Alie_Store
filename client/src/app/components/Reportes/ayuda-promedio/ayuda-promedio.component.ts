import { Component, OnInit } from '@angular/core';

import {AdminService} from '../../../services/admin.service';

import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-ayuda-promedio',
  templateUrl: './ayuda-promedio.component.html',
  styleUrls: ['./ayuda-promedio.component.css']
})
export class AyudaPromedioComponent implements OnInit {

  listPromedio: any = [];


  constructor(private adminService: AdminService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  Buscar(){
    this.adminService.Promedio().subscribe(
      res => {
        this.listPromedio = res;
        this.toast.info('Se ha terminado la Busquedad', 'informacion');
      },
      err => {

      }
    );
  }

}
