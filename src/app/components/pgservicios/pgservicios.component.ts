import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pgservicios',
  templateUrl: './pgservicios.component.html',
  styleUrls: ['./pgservicios.component.css']
})
export class PgserviciosComponent implements OnInit {

  //Usuario
  IdUsuarioCookies: string = this.cookies.get('IdUsuario');

  //VARIABLES GLOBALES
  AuxOrganizar: boolean;

  //Variables modal mensaje
  modalMensaje: BsModalRef;
  lblModalMsaje: string;
  VerMensaje: boolean = false;

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

  //Ver agregar
  Veragregar: boolean = false;

  //Modal Ver detalles
  modalVerdetalles: BsModalRef;

  //Modal Editar
  modalEditar: BsModalRef;

  //VARIABLES VER DETALLES
  VerDetallesServicios: string;
  RespuServicio: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private Servicios: MetodosGlobalesService,
    private _modalService: BsModalService,
    private cookies: CookieService,
    private http: HttpClient
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
        Observaciones: this.Observaciones,
        Prioridad: this.IdPrioridad
      }
      this.Servicios.insertaservicio('3', InsertaServ).subscribe(respu => {
        this.Grilla(this.Tiposervidor, this.Prioridad, this.Sp);

        if (respu == 'Servicio creado correctamente.') {
          this.IdIntegrador = '0';
          this.SP = '';
          this.Exce = '';
          this.IdTipoServicio = '0';
          this.Observacion = '';
          this.Observaciones = '';
          this.IdPrioridad = '0';
        }
      })
    }
  }
  Ordenarprioridad() {
    if (this.AuxOrganizar == true) {
      this.AuxOrganizar = false;
      this.ArrayGrilla.sort((a: { Prioridad: string; }, b: { Prioridad: string; }) => a.Prioridad.localeCompare(b.Prioridad));
    } else {
      this.AuxOrganizar = true;
      this.ArrayGrilla.sort((a: { Prioridad: string; }, b: { Prioridad: string; }) => b.Prioridad.localeCompare(a.Prioridad));
    }
  }
  OrdenarFechaAsignacion() {
    if (this.AuxOrganizar == true) {
      this.AuxOrganizar = false;
      this.ArrayGrilla.sort((a: { FechaAsignacion: string; }, b: { FechaAsignacion: string; }) => a.FechaAsignacion.localeCompare(b.FechaAsignacion));
    } else {
      this.AuxOrganizar = true;
      this.ArrayGrilla.sort((a: { FechaAsignacion: string; }, b: { FechaAsignacion: string; }) => b.FechaAsignacion.localeCompare(a.FechaAsignacion));
    }
  }
  OrdenarIntegrador() {
    if (this.AuxOrganizar == true) {
      this.AuxOrganizar = false;
      this.ArrayGrilla.sort((a: { NombreIntegrador: string; }, b: { NombreIntegrador: string; }) => a.NombreIntegrador.localeCompare(b.NombreIntegrador));
    } else {
      this.AuxOrganizar = true;
      this.ArrayGrilla.sort((a: { NombreIntegrador: string; }, b: { NombreIntegrador: string; }) => b.NombreIntegrador.localeCompare(a.NombreIntegrador));
    }
  }
  OrdenarSp() {
    if (this.AuxOrganizar == true) {
      this.AuxOrganizar = false;
      this.ArrayGrilla.sort((a: { StoredProcedures: string; }, b: { StoredProcedures: string; }) => a.StoredProcedures.localeCompare(b.StoredProcedures));
    } else {
      this.AuxOrganizar = true;
      this.ArrayGrilla.sort((a: { StoredProcedures: string; }, b: { StoredProcedures: string; }) => b.StoredProcedures.localeCompare(a.StoredProcedures));
    }
  }
  OrdenarExce() {
    if (this.AuxOrganizar == true) {
      this.AuxOrganizar = false;
      this.ArrayGrilla.sort((a: { EXEC_SP: string; }, b: { EXEC_SP: string; }) => a.EXEC_SP.localeCompare(b.EXEC_SP));
    } else {
      this.AuxOrganizar = true;
      this.ArrayGrilla.sort((a: { EXEC_SP: string; }, b: { EXEC_SP: string; }) => b.EXEC_SP.localeCompare(a.EXEC_SP));
    }
  }
  OrdenaTipoServicio() {
    if (this.AuxOrganizar == true) {
      this.AuxOrganizar = false;
      this.ArrayGrilla.sort((a: { TipoServicio: string; }, b: { TipoServicio: string; }) => a.TipoServicio.localeCompare(b.TipoServicio));
    } else {
      this.AuxOrganizar = true;
      this.ArrayGrilla.sort((a: { TipoServicio: string; }, b: { TipoServicio: string; }) => b.TipoServicio.localeCompare(a.TipoServicio));
    }
  }
  OrdenaEstado() {
    if (this.AuxOrganizar == true) {
      this.AuxOrganizar = false;
      this.ArrayGrilla.sort((a: { Estado: string; }, b: { Estado: string; }) => a.Estado.localeCompare(b.Estado));
    } else {
      this.AuxOrganizar = true;
      this.ArrayGrilla.sort((a: { Estado: string; }, b: { Estado: string; }) => b.Estado.localeCompare(a.Estado));
    }
  }
  OrdenaAsiganadopor() {
    if (this.AuxOrganizar == true) {
      this.AuxOrganizar = false;
      this.ArrayGrilla.sort((a: { NombreUsuarioAsigna: string; }, b: { NombreUsuarioAsigna: string; }) => a.NombreUsuarioAsigna.localeCompare(b.NombreUsuarioAsigna));
    } else {
      this.AuxOrganizar = true;
      this.ArrayGrilla.sort((a: { NombreUsuarioAsigna: string; }, b: { NombreUsuarioAsigna: string; }) => b.NombreUsuarioAsigna.localeCompare(a.NombreUsuarioAsigna));
    }
  }
  OrdenaFechaSolucion() {
    if (this.AuxOrganizar == true) {
      this.AuxOrganizar = false;
      this.ArrayGrilla.sort((a: { FechaSolucion: string; }, b: { FechaSolucion: string; }) => a.FechaSolucion.localeCompare(b.FechaSolucion));
    } else {
      this.AuxOrganizar = true;
      this.ArrayGrilla.sort((a: { FechaSolucion: string; }, b: { FechaSolucion: string; }) => b.FechaSolucion.localeCompare(a.FechaSolucion));
    }
  }
  OrdenaObservacion() {
    if (this.AuxOrganizar == true) {
      this.AuxOrganizar = false;
      this.ArrayGrilla.sort((a: { Observacion: string; }, b: { Observacion: string; }) => a.Observacion.localeCompare(b.Observacion));
    } else {
      this.AuxOrganizar = true;
      this.ArrayGrilla.sort((a: { Observacion: string; }, b: { Observacion: string; }) => b.Observacion.localeCompare(a.Observacion));
    }
  }
  OrdenaObservaciones() {
    if (this.AuxOrganizar == true) {
      this.AuxOrganizar = false;
      this.ArrayGrilla.sort((a: { Observaciones: string; }, b: { Observaciones: string; }) => a.Observaciones.localeCompare(b.Observaciones));
    } else {
      this.AuxOrganizar = true;
      this.ArrayGrilla.sort((a: { Observaciones: string; }, b: { Observaciones: string; }) => b.Observaciones.localeCompare(a.Observaciones));
    }
  }




















  BtnInfo(templateMensaje: TemplateRef<any>) {
    this.VerMensaje = true;
    this.modalMensaje = this._modalService.show(templateMensaje)
  }
  BtnVerAgregar() {
    this.Veragregar = true;
  }

  BtnOcultarAgregar() {
    this.Veragregar = false;
  }

  NombreSp: string;
  AbrirPopapVerDetalles(templateDetallesServicio: TemplateRef<any>, Arr: any) {
    this.VerDetallesServicios = Arr.DatosServicio;
    this.NombreSp = Arr.StoredProcedures;

    this.ConsumeServicio(Arr.TipoServicio, Arr.ConsumeServicio, '', Arr.UrlServicio).subscribe(respu => {

      var Temp: string;
      for (var i = 0; i < respu.length; i++) {
        Temp = JSON.stringify(respu[i]);
        var newString = Temp.replace('{', '{\n');
        var newindef = newString.replace('undefined', '');
        this.RespuServicio = this.RespuServicio + newindef + '\n';
        this.RespuServicio = this.RespuServicio + '\n';
      }
      /*
            var TextoTexteArea = document.getElementById('ResultadoConsultaServicio');
            TextoTexteArea.value = respu.join("\n");
      
           */
    })
    this.modalVerdetalles = this._modalService.show(templateDetallesServicio);
    this.modalVerdetalles.setClass('modal-lg');
  }
  ConsumeServicio(TipoServicio: string, NombreSerAndParametros: string, TipoPostPut: any, UrlServicio: string) {
    var URLServidor = UrlServicio;
    if (TipoServicio == 'CONSULTA') {
      return this.http.get<any[]>(URLServidor + NombreSerAndParametros);
    }
    if (TipoServicio == 'INSERTA') {
      return this.http.post<any[]>(URLServidor + NombreSerAndParametros, TipoPostPut);
    }
    if (TipoServicio == 'ACTUALIZACION') {
      return this.http.put<any[]>(URLServidor + NombreSerAndParametros, TipoPostPut);
    }
    if (TipoServicio == 'DELETE') {
      return this.http.post<any[]>(URLServidor + NombreSerAndParametros, TipoPostPut);
    }
    return this.http.get<any[]>(URLServidor + NombreSerAndParametros);
  }


  //Editar servicio
  IdServicioEdit: string;
  IdIntegradorEdit: string;
  SpEdit: string;
  ExecEdit: string;
  IdTipoServicioEdit: string;
  LblObservacionEdit: string;
  LblObservacionesEdit: string;
  IdPrioridadEdit: string;
  EditServ(templateDetallesServidor: TemplateRef<any>, Arr: any) {
    this.IdServicioEdit = Arr.IdServicios;
    this.IdIntegradorEdit = Arr.IdIntegrador;
    this.SpEdit = Arr.StoredProcedures;
    this.ExecEdit = Arr.EXEC_SP;
    this.IdTipoServicioEdit = Arr.TipoServicio;
    this.LblObservacionEdit = Arr.Observacion;
    this.LblObservacionesEdit = Arr.Observaciones;
    this.IdPrioridadEdit = Arr.Prioridad;

    this.modalEditar = this._modalService.show(templateDetallesServidor);
    this.modalEditar.setClass('modal-lg');
  }
  UpdateServicio(templateMensaje: TemplateRef<any>) {
    this.VerMensaje = false;
    const Update = {
      IdServicios: this.IdServicioEdit,
      IdProyecto: 0,
      FechaAsignacion: this.Fecha,
      IdIntegrador: this.IdIntegradorEdit,
      StoredProcedures: this.SpEdit,
      EXEC_SP: this.ExecEdit,
      TipoServicio: this.IdTipoServicioEdit,
      Estado: 0,
      IdUsuarioAsigna: this.IdUsuarioCookies,
      Observacion: this.LblObservacionEdit,
      Observaciones: this.LblObservacionesEdit,
      Prioridad: this.IdPrioridadEdit
    }

    this.Servicios.insertaservicio('2', Update).subscribe(respu => {
      if ('Servicio actualizado correctamente.') {
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = respu;
        this.Grilla(this.Tiposervidor, this.Prioridad, this.Sp);
        this.modalEditar.hide();
      } else {
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = 'No fue posible actualizar el servicio, por favor comuníquese con soporte técnico';
        this.lblModalMsaje = respu;
        this.modalEditar.hide();
      }
    })
  }

  //Eliminar servicio
  Eliminaservicio(Arr: any, templateMensaje: TemplateRef<any>) {
    this.VerMensaje = false;
    const Delete = {
      IdServicios: Arr.IdServicios,
      StoredProcedures: Arr.StoredProcedures
    }
    this.Servicios.eliminaservicio('4', Delete).subscribe(respu => {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = respu;
      this.Grilla(this.Tiposervidor, this.Prioridad, this.Sp);
    })
  }
}