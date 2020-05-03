import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { isNullOrUndefined } from 'util';



@Component({
  selector: 'app-navigation-admin',
  templateUrl: './navigation-admin.component.html',
  styleUrls: ['./navigation-admin.component.css']
})
export class NavigationAdminComponent implements OnInit {

  userSession: any ; // contiene informacion usuario

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.Verificar_Admin();
  }

  Verificar_Admin(){
    const dato = localStorage.getItem('user');
    if (!isNullOrUndefined(dato)){
        const user = JSON.parse(dato);
        if (user.TIPO_USUARIO === 0){
          this.userSession = user;
        }else{
          this.router.navigate(['/error']);
        }
    }else{
      this.router.navigate(['/home']);
    }
  }

}
