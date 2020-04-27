import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-confirmar-correo',
  templateUrl: './confirmar-correo.component.html',
  styleUrls: ['./confirmar-correo.component.css']
})
export class ConfirmarCorreoComponent implements OnInit {

  correo: string ;


  constructor(private route: ActivatedRoute, private redicc: Router) {

    this.correo = this.route.snapshot.params.correo;

    console.log(this.correo);
   }

  ngOnInit(): void {
  }

  Redireccionar_Login(){
    this.redicc.navigate(['/login']);
  }

}
