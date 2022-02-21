import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-layoutpagina',
  templateUrl: './layoutpagina.component.html',
  styleUrls: ['./layoutpagina.component.css'],
})
export class LayoutpaginaComponent implements OnInit {
  //Variables globales
  lblModalMsaje: string;
  modalMensaje: BsModalRef;
  AuxiliarDiv: boolean;


  //Variables TipoServidor
  ArregloGrillaTipoServidor: any;
  LblDescripcion: string;
  //Editar
  modalEditarTipoServidor: BsModalRef;
  LblDescripcionEdit: string;
  IdTipoServidor: string;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private _modalService: BsModalService,
    public router: Router,
    private cookies: CookieService,
    private modalServiceDos: NgbModal,
    private Servicios: MetodosGlobalesService) { }
  //Variables nombre
  NombreUsu: string = this.cookies.get('Nombre');
  //Variables admin
  AminUser: string = this.cookies.get('UserAdmin');

  elem: any;
  ngOnInit(): void {
    this.Obtienedata();
    this.elem = document.documentElement;
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

  VerPgTipoBackup() {
    this.router.navigate(['home/Pgtipobackup']);
  }
  VerPgProyectos() {
    this.router.navigate(['home/PgProyectos']);
  }


  VerHome() {
    this.router.navigate(['home']);
  }
  VerPgUsuarios() {
    this.router.navigate(['home/PgUsuarios']);
  }
  VerPgUsuario() {
    this.router.navigate(['home/PgUsuario']);
  }
}