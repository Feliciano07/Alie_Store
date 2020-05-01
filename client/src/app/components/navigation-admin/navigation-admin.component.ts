import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation-admin',
  templateUrl: './navigation-admin.component.html',
  styleUrls: ['./navigation-admin.component.css']
})
export class NavigationAdminComponent implements OnInit {

  userSession: any ; // contiene informacion usuario

  constructor() { }

  ngOnInit(): void {
    this.userSession = JSON.parse(sessionStorage.getItem('user'));
  }

}
