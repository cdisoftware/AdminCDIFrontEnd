import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pg-asigna-roles',
  templateUrl: './pg-asigna-roles.component.html',
  styleUrls: ['./pg-asigna-roles.component.css']
})
export class PgAsignaRolesComponent implements OnInit {
  //NUEVO USUARIO
  NuevoUsuario: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  NuevoCliente() {
    this.NuevoUsuario = true;
  }
  CancelaNuevoCliente(){
    this.NuevoUsuario = false;
  }
}
