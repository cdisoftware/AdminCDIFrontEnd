import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-layoutpagina',
  templateUrl: './layoutpagina.component.html',
  styleUrls: ['./layoutpagina.component.css'],
})
export class LayoutpaginaComponent implements OnInit {
  //Variables globales
  lblModalMsaje: string;
  modalMensaje: BsModalRef;

  //Variables consulta tipo servidor
  ArrayConsultatipoServidor: any;

  constructor(
    private _modalService: BsModalService,
    public router: Router,
    private cookies: CookieService,
    private modalServiceDos: NgbModal,
    private Servicios: MetodosGlobalesService) { }

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



  TipoServidor(templateHardware: TemplateRef<any>, templateMensaje: TemplateRef<any>) {
    this.modalServiceDos.open(templateHardware, { size: 'xl' });
    const consultaTipoServidor = {
      Descripcion:""
    }
    this.ArrayConsultatipoServidor = [];
    this.Servicios.consultatiposerv('0', consultaTipoServidor).subscribe(respu => {
      if (respu.length > 0) {
        this.ArrayConsultatipoServidor = respu;
      }else{
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = respu;
      }
    })
  }
}
function templateMensaje(templateMensaje: any, arg1: any) {
  throw new Error('Function not implemented.');
}

