import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {UsuarioService} from '../../services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.component.html',
  styleUrls: ['./recuperacion.component.css']
})
export class RecuperacionComponent implements OnInit {

  correo = '';

  constructor(private tosastr: ToastrService, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {

  }

  Enviar_Correo(): void{
    if (this.correo === ''){
      this.tosastr.warning('No se ha agregado un correo', 'Atencion');
    }else{
      const data = {
        correo: this.correo
      };

      this.usuarioService.Cambiar_Pass(data).subscribe(
        res => {
            this.router.navigate(['/confirmacion', this.correo]);
        },
        err => {
          this.tosastr.error('Su correo no es valido', 'Alto');
        }
      );
    }
  }

}
