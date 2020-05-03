import { Component, OnInit } from '@angular/core';






@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  adminF = false;
  servicioM = false ;
  ayudaP = false ;
  cantidadD = false;
  productos = false;
  top = false;


  constructor() { }

  ngOnInit(): void {

  }


}
