import { Component, OnInit } from '@angular/core';

import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'app-carga-cliente',
  templateUrl: './carga-cliente.component.html',
  styleUrls: ['./carga-cliente.component.css']
})
export class CargaClienteComponent implements OnInit {

  uploadFile: Array<File>;
  csvRecords: any = [];

  constructor(private ngxCsvParser: NgxCsvParser) { }

  ngOnInit(): void {
  }

  onEvent(e){
    const files = e.target.files;

    this.ngxCsvParser.parse(files[0], { header: true, delimiter: ',' })
      .pipe().subscribe((result: any) => {

        console.log('Result', result);
        this.csvRecords = result;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }

}
