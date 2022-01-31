import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Console } from 'console';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  VerPgUsuarios() {
    this.router.navigate(['home/PgUsuarios']);
  }





  //Tipo servidor
  //Consulta
  TipoServidor(templaTipoSer: TemplateRef<any>, templateMensaje: TemplateRef<any>) {
    this.modalServiceDos.open(templaTipoSer, { size: 'xl' });
    const consultaTipoServidor = {
      Descripcion: "0"
    }
    this.ArregloGrillaTipoServidor = [];
    this.Servicios.consultatiposerv('0', consultaTipoServidor).subscribe(respu => {
      if (respu.length > 0) {
        this.ArregloGrillaTipoServidor = respu;
      } else {
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = "No fue posible ver los resultados, por favor comuníquese con soporte técnico.";
      }
    })
  }
  verDiv() {
    this.AuxiliarDiv = true;
  }
  OcultarDiv() {
    this.AuxiliarDiv = false;
  }
  //Insert
  InsertaTipoServidor(templateMensaje: TemplateRef<any>) {
    const InsertaTipoServidor = {
      Descripcion: this.LblDescripcion
    }
    this.Servicios.insertatiposervidor('3', InsertaTipoServidor).subscribe(respu => {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = respu;

      this.LblDescripcion = '';
      this.AuxiliarDiv = false;
      if (respu == "Tipo_Servidor registrado exitosamente.") {
        const consultaTipoServidor = {
          Descripcion: "0"
        }
        this.ArregloGrillaTipoServidor = [];
        this.Servicios.consultatiposerv('0', consultaTipoServidor).subscribe(respu => {
          if (respu.length > 0) {
            this.ArregloGrillaTipoServidor = respu;
          } else {
            this.modalMensaje = this._modalService.show(templateMensaje);
            this.lblModalMsaje = "No fue posible ver los resultados, por favor comuníquese con soporte técnico.";
          }
        })
      }
    })
  }
  //Edit
  EditarTipoServidor(templateEditartiposervidor: TemplateRef<any>, ArGrilla: any) {
    this.modalEditarTipoServidor = this._modalService.show(templateEditartiposervidor)
    this.LblDescripcionEdit = ArGrilla.Descripcion;
    this.IdTipoServidor = ArGrilla.Id_Tipo_S
  }

  EditarTS(templaTipoSer: TemplateRef<any>, templateMensaje: TemplateRef<any>) {
    this.modalEditarTipoServidor.hide();
    const EditTipoServidor = {
      Id_Tipo_S: this.IdTipoServidor,
      Descripcion: this.LblDescripcionEdit
    }
    console.log(EditTipoServidor)
    this.Servicios.actualizatiposervidor('2', EditTipoServidor).subscribe(respu => {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = respu;

      this.LblDescripcionEdit = '';
      if (respu == "Tipo_Servidor actualizadoexitosamente.") {
        const consultaTipoServidor = {
          Descripcion: "0"
        }
        this.ArregloGrillaTipoServidor = [];
        this.Servicios.consultatiposerv('0', consultaTipoServidor).subscribe(respu => {
          if (respu.length > 0) {
            this.ArregloGrillaTipoServidor = respu;
          } else {
            this.modalMensaje = this._modalService.show(templateMensaje);
            this.lblModalMsaje = "No fue posible ver los resultados, por favor comuníquese con soporte técnico.";
          }
        })
      }
    })
  }
}