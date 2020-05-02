import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


import {ProductoService} from '../../services/producto.service';


import {ToastrService} from 'ngx-toastr';




@Component({
  selector: 'app-nagivation-cliente',
  templateUrl: './nagivation-cliente.component.html',
  styleUrls: ['./nagivation-cliente.component.css']
})
export class NagivationClienteComponent implements OnInit {

  userSession: any ; // contiene informacion usuario

  producto: string;

  constructor(private router: Router, private toast: ToastrService, private productoService: ProductoService) {

  }

  ngOnInit(): void {
    this.userSession = JSON.parse(sessionStorage.getItem('user'));
    this.producto = '';
  }

  Search_Producto(): void{
      if (this.producto !== ''){
          const data = {
            producto: '%' + this.producto + '%'
          };

          this.productoService.Search_Producto(data).subscribe(
              res => {
                  // console.log(res);
                  localStorage.setItem('busquedad', JSON.stringify(res));
                  this.router.navigate(['/busquedad']);
              },
              err => {

              }
          );

      }else{
        this.toast.warning('No se ha especificado contenido a buscar', 'Atencion');
      }
      this.producto = '';
  }


}
