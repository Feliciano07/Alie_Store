import { Component, OnInit, HostBinding } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import {Router} from '@angular/router';

import {UsuarioService} from '../../services/usuario.service';

import {ToastrService} from 'ngx-toastr';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  usuario: Usuario = {
    correo: '',
    clave: ''
  };

  userLogin: any;

  constructor(private usuarioService: UsuarioService, private tosastr: ToastrService, private router: Router) {

  }

  ngOnInit(): void {
  }

  SearchUser(): void{
    console.log(this.usuario);
    this.usuarioService.Obtener_Usuario(this.usuario).subscribe(
      res => {
          // this.tosastr.success('Session Iniciada', 'Informacion');
          this.userLogin = res;
          sessionStorage.setItem('user', JSON.stringify(this.userLogin));
          if  (this.userLogin.TIPO_USUARIO === 0){
            this.router.navigate(['/admin']);
          }else{
            this.router.navigate(['/cliente']);
          }

      },
      err => {
        console.log('a'); // send codigo de error
        this.tosastr.warning('Credenciales invalidas', 'Atencion');
      }
    );
  }

  Recuperar(){
    this.router.navigate(['/recuperar']);
  }

}
