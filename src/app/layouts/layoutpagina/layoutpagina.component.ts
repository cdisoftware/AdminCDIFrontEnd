import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Console } from 'console';

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


  //Tipo servidor
    //Consulta
  TipoServidor(templateHardware: TemplateRef<any>, templateMensaje: TemplateRef<any>) {
    this.modalServiceDos.open(templateHardware, { size: 'xl' });
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
    //Insert
  InsertaTipoServidor(templateMensaje: TemplateRef<any>){
    const InsertaTipoServidor = {
      Descripcion: this.LblDescripcion
    }
    this.Servicios.insertatiposervidor('3', InsertaTipoServidor).subscribe(respu => {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = respu;

      this.LblDescripcion = '';
      this.AuxiliarDiv = false;
    })
  }
    //Edit
    EditarTipoServidor(templateMensaje: TemplateRef<any>, ArGrilla: any){
      this.LblDescripcionEdit = ArGrilla.Descripcion;
      console.log(this.LblDescripcionEdit)
      const EditTipoServidor = {
        Descripcion: this.LblDescripcionEdit
      }
      this.Servicios.actualizatiposervidor('2', EditTipoServidor).subscribe(respu => {
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = respu;
  
        this.LblDescripcionEdit = '';
      })
    }
}
function templateMensaje(templateMensaje: any, arg1: any) {
  throw new Error('Function not implemented.');
}

