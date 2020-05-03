import { Component, OnInit } from '@angular/core';

import {AdminService} from '../../../services/admin.service';

import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin-femenino',
  templateUrl: './admin-femenino.component.html',
  styleUrls: ['./admin-femenino.component.css']
})
export class AdminFemeninoComponent implements OnInit {

  yerAdmin = 1900;

  listAdmin: any = [];

  constructor(private adminService: AdminService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  Buscar(){

    const data = {
      year: this.yerAdmin.toString()
    };

    this.adminService.Admin_Year(data).subscribe(
      res => {
          this.listAdmin = res ;
          this.toast.info('Busquedad Finalizada', 'Infomracion');
      },
      err => {
          // mensaje de no se encontro
      }
    );

  }

}
