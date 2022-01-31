import { Component, OnInit, TemplateRef } from '@angular/core';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Workbook } from "exceljs";
import { saveAs } from 'file-saver';
import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pgservidores',
  templateUrl: './pgservidores.component.html',
  styleUrls: ['./pgservidores.component.css']
})
export class PgservidoresComponent implements OnInit {
  //Usuario
  IdUsuarioCookies: string = this.cookies.get('IdUsuario');
  //Variables globales
  lblModalMsaje: string;
  modalMensaje: BsModalRef;
  modalAgregar: BsModalRef;

  //Variables grilla
  ArregloGrilla: any;
  AuxiliadorGrilla: boolean;

  //Variables nombre servidor
  lblNombreservidor: string;

  //Variables SO
  lblSO: string;

  //Variables Estado
  IdEstado: string;

  //Variables lista usuario
  ArregloListaUsuario: any[];

  //Variables Usuario
  IdUsuario: string;

  //Variables agregar servidor
  LblIpServidor: string;
  LblNombre: string;
  LblSO: string;
  LblSoftware: string;
  IdEstadoAgregar: string;
  Id_TipoServidor: string;
  LblObservacion: string;
  LblUsuarios: string;
  LblPassword: string;
  IdServidorAloja: string;

  //Variables Fecha
  Dia = new Date().getDate();
  Mes = new Date().getMonth() + 1;
  Año = new Date().getFullYear();
  Fecha: string = this.Año + '-' + this.Mes + '-' + this.Dia;

  //Variables lista agregar servidor
  ArregloListaServidor: any;

  //Variables lista agregar servidor
  ArregloListaTipoServidor: any;

  //Variables ver detalles
  LblUsuario: string;
  LblPasswordVer: string;
  LblServidor: string;

  //Variables editar servidor
  modalEditarServidor: BsModalRef;
  LblIpServidorEdit: string;
  LblNombreEdit: string;
  LblSOEdit: string;
  LblSoftwareEdit: string;
  IdEstadoAgregarEdit: string;
  Id_TipoServidorEdit: string;
  LblObservacionEdit: string;
  LblUsuariosEdit: string;
  LblPasswordEdit: string;
  IdServidorAlojaEdit: string;

  constructor(private _modalService: BsModalService,
    private Servicios: MetodosGlobalesService,
    private modalServiceDos: NgbModal,
    private cookies: CookieService
  ) { }

  ngOnInit(): void {
    this.IdEstado = '2';
    this.IdUsuario = '0';
    this.lblNombreservidor = '';
    this.lblSO = '';

    //Inicializar variables agregar servidor
    this.LblIpServidor = "";
    this.LblNombre = "";
    this.LblSO = "";
    this.LblSoftware = "";
    this.IdEstadoAgregar = "2";
    this.Id_TipoServidor = "0";
    this.LblObservacion = "";
    this.LblUsuarios = "";
    this.LblPassword = '';
    this.IdServidorAloja = "0";

    //Inicializar variables editar servidor
    this.LblIpServidorEdit = '';
    this.LblNombreEdit = '';
    this.LblSOEdit = '';
    this.LblSoftwareEdit = '';
    this.IdEstadoAgregarEdit = '';
    this.Id_TipoServidorEdit = '';
    this.LblObservacionEdit = '';
    this.LblUsuariosEdit = '';
    this.LblPasswordEdit = '';
    this.IdServidorAlojaEdit = '';


    this.Grilla(this.lblNombreservidor, this.lblSO, this.IdEstado, this.IdUsuario);
    this.ListaUsuario();
    this.ListaServidor();
    this.ListaTipoServidor();
  }

  Limpiar() {
    this.IdEstado = '2';
    this.IdUsuario = '0';
    this.lblNombreservidor = '';
    this.lblSO = '';

    //Limpiar variables agregar servidor
    this.LblIpServidor = "";
    this.LblNombre = "";
    this.LblSO = "";
    this.LblSoftware = "";
    this.IdEstadoAgregar = "2";
    this.Id_TipoServidor = "0";
    this.LblObservacion = "";
    this.LblUsuarios = "";
    this.LblPassword = '';
    this.IdServidorAloja = "0";


    //Limpiar variables editar servidor
    this.LblIpServidorEdit = '';
    this.LblNombreEdit = '';
    this.LblSOEdit = '';
    this.LblSoftwareEdit = '';
    this.IdEstadoAgregarEdit = '';
    this.Id_TipoServidorEdit = '';
    this.LblObservacionEdit = '';
    this.LblUsuariosEdit = '';
    this.LblPasswordEdit = '';
    this.IdServidorAlojaEdit = '';

    this.Grilla(this.lblNombreservidor, this.lblSO, this.IdEstado, this.IdUsuario);
  }
  //Grilla
  Grilla(NombreServidor: string, SO: string, IdEstado: string, IdUsuario: string) {
    if (NombreServidor == undefined || NombreServidor == '') {
      NombreServidor = '0';
    }
    if (SO == undefined || SO == '') {
      SO = '0';
    }
    this.ArregloGrilla = [];
    this.AuxiliadorGrilla = false;
    this.Servicios.consultaservidors('1', NombreServidor, SO, IdEstado, IdUsuario).subscribe(respu => {
      if (respu.length > 0) {
        this.ArregloGrilla = respu;
        this.AuxiliadorGrilla = true;
      }
    })
  }

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


  //Popap agregar
  BtnNuevo(templateAgregar: TemplateRef<any>) {
    this.modalAgregar = this._modalService.show(templateAgregar)
    this.LblPassword = '';
  }
  AgregarServidor(templateMensaje: TemplateRef<any>) {
    if (this.LblIpServidor == undefined || this.LblIpServidor == '' || this.LblNombre == undefined || this.LblNombre == '' || this.LblSO == undefined || this.LblSO == '' ||
      this.LblSoftware == undefined || this.LblSoftware == '' || this.IdEstadoAgregar == undefined || this.IdEstadoAgregar == '' || this.Id_TipoServidor == undefined || this.Id_TipoServidor == ''
      || this.LblObservacion == undefined || this.LblObservacion == '' || this.LblUsuarios == undefined || this.LblUsuarios == '' || this.LblPassword == undefined || this.LblPassword == ''
      || this.IdServidorAloja == undefined || this.IdServidorAloja == '') {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = "Por favor complete los campos a agregar";
    } else {
      const InsertaServidor = {
        Ip_S: this.LblIpServidor,
        Nombre: this.LblNombre,
        SO: this.LblSO,
        Software: this.LblSoftware,
        Estado: this.IdEstadoAgregar,
        Id_Tipo_S: this.Id_TipoServidor,
        Observacion: this.LblObservacion,
        Usuario_Ser: this.LblUsuarios,
        Password: this.LblPassword,
        Servicio_aloja: this.IdServidorAloja,
        Id_U: this.IdUsuarioCookies,
        Fecha_Ult_Mod: this.Fecha
      }
      this.Servicios.insertaserv('3', InsertaServidor).subscribe(respu => {
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = respu;

        this.Limpiar();

        this.modalAgregar.hide();
      })
    }
  }
  ListaServidor() {
    this.ArregloListaServidor = [];
    this.Servicios.consultaservidors('1', '0', '0', '2', '0').subscribe(respu => {
      if (respu.length > 0) {
        this.ArregloListaServidor = respu;
      }
    })
  }
  ListaTipoServidor() {
    this.ArregloListaTipoServidor = [];
    const ListaTipoServidor = {
      Descripcion: '0'
    }
    this.Servicios.consultatiposerv('0', ListaTipoServidor).subscribe(respu => {
      if (respu.length > 0) {
        this.ArregloListaTipoServidor = respu;
      }
    })
  }

  //Ver detalle
  VerDetalle(templateVerDetalles: TemplateRef<any>, ArGrilla: any) {
    this.modalServiceDos.open(templateVerDetalles, { size: 'xl' });
    this.LblUsuario = ArGrilla.Usuario_Ser;
    this.LblPasswordVer = ArGrilla.Password;
    this.LblServidor = ArGrilla.Servidor_Aloja;
  }



  //Editar Bckup
  Editarbackup(templateEditarServidor: TemplateRef<any>, Array: any) {
    this.modalEditarServidor = this._modalService.show(templateEditarServidor);
    this.LblIpServidorEdit = Array.Ip_S;
    this.LblNombreEdit = Array.Nombre;
    this.LblSOEdit = Array.SO;
    this.LblSoftwareEdit = Array.Software;
    this.IdEstadoAgregarEdit = Array.Estado;
    this.Id_TipoServidorEdit = Array.TipoServidor;//Falta editar tiene que traer el id no el nombre
    this.LblObservacionEdit = Array.Observacion;
    this.LblUsuariosEdit = Array.Usuario_Ser;
    this.LblPasswordEdit = Array.Password;
    this.IdServidorAlojaEdit = Array.Servidor_Aloja;
  }
}