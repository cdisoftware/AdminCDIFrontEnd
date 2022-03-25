import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Workbook } from "exceljs";
import { saveAs } from 'file-saver';
import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pgservicios',
  templateUrl: './pgservicios.component.html',
  styleUrls: ['./pgservicios.component.css']
})
export class PgserviciosComponent implements OnInit {
  @ViewChild('templateVerDetalles', { static: false }) contenidoDelModal: any;
  ngAfterViewInit(templateMensaje: TemplateRef<any>) {
    var num: number = 1;
    this.VerPendientesDesarollo(templateMensaje, num);
  }

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
    private http: HttpClient,
    private modalServiceDos: NgbModal
  ) { }

  ngOnInit(): void {
    let Id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.IdProyecto = '';
    this.IdProyecto += Id;

    this.Grilla(this.Tiposervidor, this.Prioridad, this.Sp);
    this.ListaUsuario();
    this.ListaTipoServidor();
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
    if (Arr.TipoServicio == 'CONSULTA') {
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
    } else if (Arr.TipoServicio == 'ACTUALIZACION' || Arr.TipoServicio == 'INSERTA' || Arr.TipoServicio == 'DELETE') {

      this.ConsumeServicio(Arr.TipoServicio, Arr.ConsumeServicio, '', Arr.UrlServicio).subscribe(respu => {

        var Temp: string;
        for (var i = 0; i < respu.length; i++) {
          Temp = JSON.stringify(respu[i]);
          var newString = Temp.replace('{', '{\n');
          var newindef = newString.replace('undefined', '');
          this.RespuServicio = this.RespuServicio + newindef + '\n';
          this.RespuServicio = this.RespuServicio + '\n';
        }
      })
    }
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
        this.LimpiaCampos();
      } else {
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = 'No fue posible actualizar el servicio, por favor comuníquese con soporte técnico';
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

  //Verdesarollador
  ArrayConsultaServiciosPendientes: any;
  VerPendientesDesarollo(templateMensaje: TemplateRef<any>, num: number) {
    this.ArrayConsultaServiciosPendientes = [];
    this.Servicios.consdesrrllopendient(this.IdUsuarioCookies, this.IdProyecto).subscribe(respu => {
      if (respu.length > 0) {
        this.ArrayConsultaServiciosPendientes = respu;
        this.modalServiceDos.open(this.contenidoDelModal, { size: 'xl' });
      } else {
        if (num != 1) {
          this.VerMensaje = false;
          this.modalMensaje = this._modalService.show(templateMensaje);
          this.lblModalMsaje = 'No tienes desarrollos pendientes por ahora (^◡^ ).';
        }
      }
      this.LimpiaCampos();
    })
  }

  //AbrirPoparServicioEcho
  modalSerEcho: BsModalRef;
  LblDatosServicio: string;
  LblObservacion: string;
  LblObservaciones: string;
  LblConsumeservicioArr: any;
  LblConsumeservicio: string;
  LblUrl: string;
  AbrirPopapServicioEcho(templateServicioEcho: TemplateRef<any>, Arr: any, templateServicioEchoPostPut: TemplateRef<any>) {
    this.LblUrl = Arr.UrlServicio;
    var NewUrl = this.LblUrl.split("/");
    this.LblPatch = NewUrl[3];
    var NewServer = NewUrl[2].split(":");
    this.LblServidorAlojaServicio = NewServer[0]
    this.NumeroPuerto = NewServer[1];

    this.LblDatosServicio = Arr.DatosServicio;
    this.LblObservacion = Arr.Observacion;
    this.LblObservaciones = Arr.Observaciones;
    if (Arr.TipoServicio != 'CONSULTA') {
      this.LblConsumeservicioArr = Arr.ConsumeServicio.split("||");
      this.LblConsumeservicio = this.LblConsumeservicioArr[0];
      this.LblPostPut = this.LblConsumeservicioArr[1];
    } else {
      this.LblConsumeservicio = Arr.ConsumeServicio;
    }

    //Servicio echo
    if (Arr.TipoServicio == 'CONSULTA') {
      this.IdServicio = Arr.IdServicios;

      this.modalSerEcho = this._modalService.show(templateServicioEcho);
      this.modalSerEcho.setClass('modal-lg');
      this.modalServiceDos.dismissAll();
    } else if (Arr.TipoServicio == 'ACTUALIZACION' || Arr.TipoServicio == 'INSERTA' || Arr.TipoServicio == 'DELETE') {
      this.IdServicio = Arr.IdServicios;

      this.modalSerEchoPostPut = this._modalService.show(templateServicioEchoPostPut);
      this.modalSerEchoPostPut.setClass('modal-lg');
      this.modalServiceDos.dismissAll();
    }
  }
  CerrarServicioEcho(templateMensaje: TemplateRef<any>) {
    this.modalSerEcho.hide();
    this.VerPendientesDesarollo(templateMensaje, 2);
    this.LimpiaCampos();
  }
  CerrarServicioEchoPostPut(templateMensaje: TemplateRef<any>) {
    this.modalSerEchoPostPut.hide();
    this.VerPendientesDesarollo(templateMensaje, 2);
    this.LimpiaCampos();
  }

  //Update servicio echo
  IdServicio: string;
  LblServidorAlojaServicio: string;
  NumeroPuerto: string;
  LblPatch: string;
  LblPostPut: string = '';
  ServicioEcho(templateMensaje: TemplateRef<any>) {
    if (this.LblObservacion == '' || this.LblObservacion == undefined || this.LblDatosServicio == '' || this.LblDatosServicio == undefined
      || this.LblObservaciones == '' || this.LblObservaciones == undefined || this.LblConsumeservicio == '' || this.LblConsumeservicio == undefined) {
      this.VerMensaje = false;
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = 'Por favor llene todos los campo a agregar ¯\_( ͡❛ ͜ʖ ͡❛)_/¯.';
    } else {
      var ConsumeServicioLLena: string = '';
      if (this.LblPostPut == '' || this.LblPostPut == undefined) {
        ConsumeServicioLLena = this.LblConsumeservicio
      } else {
        ConsumeServicioLLena = this.LblConsumeservicio + "||" + this.LblPostPut
      }
      const Echo = {
        IdServicios: this.IdServicio,
        IdProyecto: this.IdProyecto,
        FechaSolucion: this.Fecha,
        Observacion: this.LblObservacion,
        DatosServicio: this.LblDatosServicio,
        Observaciones: this.LblObservaciones,
        ConsumeServicio: ConsumeServicioLLena,
        UrlServicio: ""
      }
      this.Servicios.updateserviciorealizado('2', Echo).subscribe(respu => {
        if (this.LblPostPut != '' || this.LblPostPut != undefined) {
          this.CerrarServicioEcho(templateMensaje);
          this.LimpiaCampos();
        } else {
          this.CerrarServicioEchoPostPut(templateMensaje);
          this.LimpiaCampos();
        }
        this.Grilla(this.Tiposervidor, this.Prioridad, this.Sp);
        this.LblPostPut = '';
        this.LimpiaCampos();
      })
    }
  }

  ArregloListaServidor: any;
  ListaTipoServidor() {
    this.ArregloListaServidor = [];
    this.Servicios.consultaservidors('1', '0', '0', '2', '0').subscribe(respu => {
      if (respu.length > 0) {
        this.ArregloListaServidor = respu;
      }
    })
  }

  GuardarURL(templateMensaje: TemplateRef<any>) {
    if (
      this.LblServidorAlojaServicio == '' || this.LblServidorAlojaServicio == undefined
      || this.NumeroPuerto == '0' || this.NumeroPuerto == undefined || this.NumeroPuerto == ''
      || this.LblPatch == '' || this.LblPatch == undefined
    ) {
      this.VerMensaje = false;
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = 'Por favor llene todos los campo a editar ¯\_( ͡❛ ͜ʖ ͡❛)_/¯.';
    } else {
      const Echo = {
        IdServicios: this.IdServicio,
        IdProyecto: this.IdProyecto,
        FechaSolucion: this.Fecha,
        Observacion: this.LblObservacion,
        DatosServicio: this.LblDatosServicio,
        Observaciones: this.LblObservaciones,
        ConsumeServicio: this.LblConsumeservicio,
        UrlServicio: 'http://' + this.LblServidorAlojaServicio + ':' + this.NumeroPuerto + '/' + this.LblPatch + '/'
      }
      this.Servicios.updateserviciorealizado('1', Echo).subscribe(respu => {
      })
    }
  }
  modalSerEchoPostPut: BsModalRef;
  ValidaSiEsPostPut() {
  }

  LimpiaCampos() {
    this.IdServicioEdit = '';
    this.IdIntegradorEdit = '';
    this.SpEdit = '';
    this.ExecEdit = '';
    this.IdTipoServicioEdit = '';
    this.LblObservacionEdit = '';
    this.LblObservacionesEdit = '';
    this.IdPrioridadEdit = '';
    this.LblDatosServicio = '';
    this.LblObservacion = '';
    this.LblObservaciones = '';
    this.LblConsumeservicioArr = [];
    this.LblConsumeservicio = '';
    this.LblUrl = '';
    this.IdServicio = '';
    this.LblServidorAlojaServicio = '';
    this.NumeroPuerto = '';
    this.LblPatch = '';
    this.LblPostPut = '';
    this.Tiposervidor = '';
    this.Prioridad = '';
    this.Sp = '';
    this.Grilla(this.Tiposervidor, this.Prioridad, this.Sp);
  }

  DescargarExcel(templateMensaje: TemplateRef<any>) {
    var TipoSer = this.Tiposervidor;
    var Prio = this.Prioridad;
    var SP = this.Sp;
    if (TipoSer == undefined || TipoSer == '') {
      TipoSer = '0';
    }

    if (Prio == undefined || Prio == '') {
      Prio = '0';
    }

    if (SP == undefined || SP == '') {
      SP = '0';
    }
    this.Servicios.consultservicios(this.IdProyecto, TipoSer, Prio, SP).subscribe(respu => {
      console.log(respu)
      if (respu.length > 0) {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet("Registro servicios");
        let header = ["Prioridad", "Fecha Asignación", "Integrador", "Stored Procedures", "Exec", "Tipo servicio", "Estado", "Asignado por", "Fecha solución", "Observación", "Observaciones"];
        worksheet.addRow(header);

        for (let x1 of respu) {
          let temp = []
          temp.push(x1['Prioridad'])
          temp.push(x1['FechaAsignacion'])
          temp.push(x1['NombreIntegrador'])
          temp.push(x1['StoredProcedures'])
          temp.push(x1['TipoServicio'])
          temp.push(x1['EXEC_SP'])
          if (x1.Estado == 1) {
            temp.push('Ok')
          } else {
            temp.push('Pendiente')
          }
          temp.push(x1['NombreUsuarioAsigna'])
          temp.push(x1['FechaSolucion'])
          temp.push(x1['Observacion'])
          temp.push(x1['Observaciones'])

          worksheet.addRow(temp)
        }

        let fname = "Registro servicios - " + this.NombreProyecto + ' - ' + this.Fecha;

        workbook.xlsx.writeBuffer().then((data) => {
          let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, fname + '.xlsx');
        });

      } else {
        this.VerMensaje = false;
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = 'No existen registros disponibles, por favor seleccione otros filtros';
      }
    })
  }
  DescargarDatosPdf() {
    const doc = new jsPDF('l', 'px', 'a3');

    autoTable(doc, {
      styles: { fillColor: [216, 216, 216] },
      columnStyles: {
        1: { cellWidth: 78 },
        2: { cellWidth: 78 },
        3: { cellWidth: 78 },
        4: { cellWidth: 78 },
        5: { cellWidth: 78 },
        6: { cellWidth: 78 },
        7: { cellWidth: 78 },
        8: { cellWidth: 78 },
        9: { cellWidth: 78 },
        10: { cellWidth: 78 },
        11: { cellWidth: 78 }
      },
      didParseCell: function (data) {
        var rows = data.table.body;
        if (data.row.index === 0) {
          data.cell.styles.fillColor = [0, 80, 80];
          data.cell.styles.textColor = [255, 255, 255];
        }
      },
      margin: { top: 10 },
      body: [
        ["Prioridad", "Fecha Asignación", "Integrador", "Stored Procedures", "Exec", "Tipo servicio", "Estado", "Asignado por", "Fecha solución", "Observación", "Observaciones"],
      ]
    })

    this.ArrayGrilla.forEach(function (respuesta: any) {

      var Res =
        [respuesta.Prioridad, respuesta.FechaAsignacion, respuesta.NombreIntegrador, respuesta.StoredProcedures, respuesta.TipoServicio, respuesta.EXEC_SP, respuesta.Estado
          , respuesta.NombreUsuarioAsigna, respuesta.FechaSolucion, respuesta.Observacion, respuesta.Observaciones];

      autoTable(doc, {
        margin: { top: 0, bottom: 0 },
        columnStyles: {
          1: { cellWidth: 78 },
        2: { cellWidth: 78 },
        3: { cellWidth: 78 },
        4: { cellWidth: 78 },
        5: { cellWidth: 78 },
        6: { cellWidth: 78 },
        7: { cellWidth: 78 },
        8: { cellWidth: 78 },
        9: { cellWidth: 78 },
        10: { cellWidth: 78 },
        11: { cellWidth: 78 }
        },
        body:
          [
            Res
          ]
      })
    });

    doc.save('Registro servicios - ' + this.NombreProyecto + ' - ' + this.Fecha + '.pdf')

  }
}