import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-pgservicios',
  templateUrl: './pgservicios.component.html',
  styleUrls: ['./pgservicios.component.css']
})
export class PgserviciosComponent implements OnInit {
  //Usuario
  IdUsuarioCookies: string = this.cookies.get('IdUsuario');
  //Variables modal mensaje
  modalMensaje: BsModalRef;
  //Variables inicio de paguina
  NombreProyecto: string;
  //Variables consulta proyecto
  ArrayGrilla: any;
  IdProyecto: string;

  //Variables iniciacion agregar
  IdPrioridad: string = '0';
  IdIntegrador: string = '0';
  SP: string = '';
  Exce: string = '';
  IdTipoServicio: string = '0';
  Observacion: string = '';
  Observaciones: string = '';

  //Variables filtros
  Tiposervidor: string;
  Prioridad: string;
  Sp: string;

  //Variables Fecha
  Dia = new Date().getDate();
  Mes = new Date().getMonth() + 1;
  Año = new Date().getFullYear();

  Fecha: string = this.Año + '-' + this.Mes + '-' + this.Dia;

  //ListaUsario
  ArregloListaUsuario: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private Servicios: MetodosGlobalesService,
    private _modalService: BsModalService,
    private cookies: CookieService
  ) { }

  ngOnInit(): void {
    let Id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.IdProyecto = '';
    this.IdProyecto += Id;

    this.Grilla(this.Tiposervidor, this.Prioridad, this.Sp);
    this.ListaUsuario();
  }

  Grilla(TipoServicio: string, Prioridad: string, Sp: string) {
    if (TipoServicio == undefined || TipoServicio == '') {
      TipoServicio = '0';
    }
    if (Prioridad == undefined || Prioridad == '') {
      Prioridad = '0';
    }
    if (Sp == undefined || Sp == '') {
      Sp = '0';
    }
    this.ArrayGrilla = [];
    this.Servicios.consultservicios(this.IdProyecto, TipoServicio, Prioridad, Sp).subscribe(respu => {
      if (respu.length > 0) {
        this.NombreProyecto = respu[0].NombreProyecto
        this.ArrayGrilla = respu;
      }
    })
  }
  //Lista usuarios
  ListaUsuario() {
    const ConsultaUsu =
    {
      Nombre: "0",
      Apellido: "0",
      Cedula: "0"
    }
    this.ArregloListaUsuario = [];
    this.Servicios.consultausuarios(ConsultaUsu).subscribe(respu => {
      this.ArregloListaUsuario = respu;
    })
  }

  AgregaServicio() {
    if (this.IdIntegrador == '0' || this.IdIntegrador == undefined || this.SP == '' || this.SP == undefined || this.Exce == '' || this.Exce == undefined ||
      this.IdTipoServicio == '0' || this.IdTipoServicio == undefined || this.Observacion == '' || this.Observacion == undefined || this.IdPrioridad == '' ||
      this.IdPrioridad == undefined) {
      console.log('Agrege todos los campos')
    } else {
      const InsertaServ = {
        IdServicios: 0,
        IdProyecto: this.IdProyecto,
        FechaAsignacion: this.Fecha,
        IdIntegrador: this.IdIntegrador,
        StoredProcedures: this.SP,
        EXEC_SP: this.Exce,
        TipoServicio: this.IdTipoServicio,
        Estado: 0,
        IdUsuarioAsigna: this.IdUsuarioCookies,
        Observacion: this.Observacion,
        Prioridad: this.IdPrioridad
      }
      this.Servicios.insertaservicio('3', InsertaServ).subscribe(respu => {
        this.Grilla(this.Tiposervidor, this.Prioridad, this.Sp);
      })
    }
  }




















  BtnInfo(templateMensaje: TemplateRef<any>) {
    this.modalMensaje = this._modalService.show(templateMensaje)
  }

}
