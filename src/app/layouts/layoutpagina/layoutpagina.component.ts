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
  //Usuario
  IdUsuarioCookies: string = this.cookies.get('IdUsuario');

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

  ngOnInit(): void {
    this.Obtienedata();
  }

  //Arreglo MENU
  ArrMenu: any = [];
  Obtienedata() {
    if (this.cookies.get('IdUsuario') == undefined || this.cookies.get('IdUsuario') == '' || this.cookies.get('IdUsuario') == null) {
      this.Cerrar();
      window.alert("Operacion no permitida");
    } else {
      console.log(this.IdUsuarioCookies)
      this.Servicios.consusuarioroles('1', this.IdUsuarioCookies).subscribe(respu => {
        console.log(respu)
        if (respu.length > 0) {
          this.ArrMenu = respu;
        } else {
          this.Cerrar();
          window.alert("El usuario no tiene roles asignados por favor comuníquese con el administrador para este le suministré uno.");
        }
      });
    }
  }

  Cerrar() {
    this.router.navigate(['']);
    this.cookies.set('Nombre', '');
    this.cookies.set('Apellido', '');
    this.cookies.set('IdUsuario', '');
  }
  VerHome() {
    this.router.navigate(['home']);
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
  VerPgUsuarios() {
    this.router.navigate(['home/PgUsuarios']);
  }
  VerPgUsuario() {
    this.router.navigate(['home/PgUsuario']);
  }
  VerPgETB() {
    this.router.navigate(['home/PgEtb']);
  }
  VerPgVPN() {
    this.router.navigate(['home/PgVpn']);
  }
  VerPgServicios(Id: string) {
    this.router.navigate(['home/PgServicios/' + Id]);
  }


  VerActividadesDiarias() {
    this.router.navigate(['home/consactividades']);
  }
  Verpgroles() {
    this.router.navigate(['home/pgroles']);
  }
  VerregistroActividadesDiarias() {
    this.router.navigate(['home/pgregtroactividades']);
  }

}