import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-layoutpagina',
  templateUrl: './layoutpagina.component.html',
  styleUrls: ['./layoutpagina.component.css'],
})
export class LayoutpaginaComponent implements OnInit {

  constructor(public router: Router, private cookies: CookieService,) { }

  ngOnInit(): void {
    this.Obtienedata();
  }
  //Usuario
  IdUsuario: string;


  Obtienedata() {
    this.IdUsuario = this.cookies.get('IdUsuario');
    console.log(this.IdUsuario)
    this.cookies.get('Nombre');
    this.cookies.get('Apellido');
    if (this.IdUsuario == undefined || this.IdUsuario == '' || this.IdUsuario == null) {
      this.Cerrar();
      window.alert("Operacion no permitida");

    }
  }

  Cerrar() {
    this.router.navigate(['']);
    this.cookies.set('Nombre', '');
    this.cookies.set('Apellido', '');
    this.cookies.set('IdUsuario', '');
  }

  VerPgBackup() {
    this.router.navigate(['home/PgBackup']);
  }
  VerPgServidores() {
    this.router.navigate(['home/PgServidores']);
  }
}
function templateMensaje(templateMensaje: any, arg1: any) {
  throw new Error('Function not implemented.');
}

