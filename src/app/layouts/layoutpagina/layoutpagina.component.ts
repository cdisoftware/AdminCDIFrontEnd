import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-layoutpagina',
  templateUrl: './layoutpagina.component.html',
  styleUrls: ['./layoutpagina.component.css'],
})
export class LayoutpaginaComponent implements OnInit {

  constructor(public router: Router, private cookies: CookieService) { }

  ngOnInit(): void {
    this.Obtienedata();
  }


  Obtienedata() {
    this.cookies.get('IdUsuario');
    this.cookies.get('Nombre');
    this.cookies.get('Apellido');
    if (this.cookies.get('IdUsuario') == undefined || this.cookies.get('IdUsuario') == '' || this.cookies.get('IdUsuario') == null) {
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
  VerHome() {
    this.router.navigate(['home']);
  }
}
function templateMensaje(templateMensaje: any, arg1: any) {
  throw new Error('Function not implemented.');
}

