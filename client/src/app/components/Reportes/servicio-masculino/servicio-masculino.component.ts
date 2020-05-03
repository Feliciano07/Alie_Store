import { Component, OnInit } from '@angular/core';


import {AdminService} from '../../../services/admin.service';

import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-servicio-masculino',
  templateUrl: './servicio-masculino.component.html',
  styleUrls: ['./servicio-masculino.component.css']
})
export class ServicioMasculinoComponent implements OnInit {

  yerAyuda = 1900;

  listAyuda: any = [];

  constructor(private adminService: AdminService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  Buscar(){
    const data = {
      year: this.yerAyuda
    };

    this.adminService.Ayuda_Year(data).subscribe(
      res => {
        this.listAyuda = res ;
        this.toast.info('Se ha terminado la Busquedad', 'Informacion');
      },
      err => {

      }
    );

  }

}
