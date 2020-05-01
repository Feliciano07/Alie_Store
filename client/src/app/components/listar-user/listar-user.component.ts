import { Component, OnInit } from '@angular/core';

import {ToastrService} from 'ngx-toastr';


import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-listar-user',
  templateUrl: './listar-user.component.html',
  styleUrls: ['./listar-user.component.css']
})
export class ListarUserComponent implements OnInit{

  public usuarios: any = []; // arreglo de usuarios existentes

  updateUser: any;



  constructor(private adminService: AdminService, private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.LoadUser();
  }


  LoadUser(): void{
    this.adminService.Listar_Usuarios().subscribe(
      res => {
        this.usuarios = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  Obtener(item){
    this.updateUser = item;
  }

  CambiarDatos(){

    this.adminService.Update(this.updateUser).subscribe(
      res => {
        this.toast.success('Usuario Modificado', 'Success');
        this.ngOnInit();
      },
      err => {
        this.toast.error('No se logro modificar el usuario', 'Error');
        console.log(err);
      }
    );

  }

}
