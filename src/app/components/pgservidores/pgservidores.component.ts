import { Component, OnInit, TemplateRef } from '@angular/core';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Workbook } from "exceljs";
import { saveAs } from 'file-saver';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import html2canvas from 'html2canvas';
import { stringify } from 'querystring';

@Component({
  selector: 'app-pgservidores',
  templateUrl: './pgservidores.component.html',
  styleUrls: ['./pgservidores.component.css']
})
export class PgservidoresComponent implements OnInit {

  //Filtros
  lblSO: string = '';
  IdEstado: string = "2";
  IdUsuario: string = '';
  ArregloListaTipoServidor: any[];


  //Variables agregar servidor
  LblIpServidorAgregar: string = '';
  LblNombreAgregar: string = '';
  LblObservacionAgregar: string = '';
  LblSoftwareAgregar: string = '';
  LblSOAgregar: string = '';
  IdEstadoAgregar: string = '';
  LblProcesadorAgregar: string = '';
  LblDiscoDuroAgregar: string = '';
  LblRamAgregar: string = '';
  Id_TipoServidorAgregar: any;
  IdServidorAloja: string = '';
  checkboxIpAgregar: boolean = false;
  checkboxAppsAgregar: boolean = false;
  checkboxBDAgregar: boolean = false;
  LblUsuariosAgregar: string = '';
  LblPasswordAgregar: string = '';
  LblIpPublicaAgregar: string = '';
  LblAplicacionesIISAgregar: string = '';
  LblBaseDeDatosAgregar: string = '';
  DisableServidorAlojaAgregar: boolean = true;


  //Variables Editar servidor
  LblIpServidorEdit: string = '';
  LblNombreEdit: string = '';
  LblObservacionEdit: string = '';
  LblSoftwareEdit: string = '';
  LblSOEdit: string = '';
  IdEstadoAgregarEdit: string = '';
  ArrayEditar: any = [];
  DisableServidorAlojaEditar: boolean = true;











  //Usuario
  IdUsuarioCookies: string = this.cookies.get('IdUsuario');
  //Variables globales
  lblModalMsaje: string;
  modalMensaje: BsModalRef;
  modalAgregar: BsModalRef;

  //Variables grilla
  ArregloGrilla: any;

  //Variables nombre servidor
  lblNombreservidor: string;

  //Variables SO


  //Variables Estado


  //Variables lista usuario


  //Variables Usuario
















  //Variables Fecha
  Dia = new Date().getDate();
  Mes = new Date().getMonth() + 1;
  Año = new Date().getFullYear();
  Fecha: string = this.Año + '-' + this.Mes + '-' + this.Dia;

  //Variables lista agregar servidor
  ArregloListaServidor: any;


  //Variables ver detalles
  LblUsuario: string;
  LblPasswordVer: string;
  LblServidor: string;
  ArrListaVerdetalles: any;

  //Variables editar servidor
  modalEditarServidor: BsModalRef;





  Id_TipoServidorEdit: string;

  IdServidorServ: string;

  //Variables agregar hardware
  AuxiliarDiv: boolean;
  modalAgregarHardware: BsModalRef;
  IdServidor: string;
  LblDiscoDuro: string;
  LblRam: string;
  LblProcesador: string;

  //Variables editar detalle servidor
  modalEditarDetalle: BsModalRef;
  LblDiscoDuroEdit: string;
  LblRamEdit: string;
  LblProcesadorEdit: string;
  IdServidorAlojaEdit: string;
  LblUsuariosEdit: string;
  LblPasswordEdit: string;
  IdServidorEditDetalle: string;

  //Titulos ver
  IpServidorVer: string;
  NombreServidorVer: string;

  //check Agregar


  //check Editar
  checkboxIpEditar: boolean = false;
  checkboxAppsEditar: boolean = false;
  checkboxBDeDitar: boolean = false;


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
    this.LblIpServidorAgregar = "";
    this.LblNombreAgregar = "";
    this.LblSOAgregar = "";
    this.LblSoftwareAgregar = "";
    this.IdEstadoAgregar = "2";
    this.Id_TipoServidorAgregar = "0";
    this.LblObservacionAgregar = "";
    this.LblUsuariosAgregar = "";
    this.LblPasswordAgregar = '';
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


    this.Grilla(this.lblSO, this.IdEstado, this.IdUsuario);
    this.ListaTipoServ();
    this.ListaServidor();
  }
  ListaTipoServ() {
    this.ArregloListaTipoServidor = [];
    const body = {
      Descripcion: "0"
    }
    this.Servicios.consultatiposerv('0', body).subscribe(respu => {
      console.log(respu)
      this.ArregloListaTipoServidor = respu;
    })
  }
  //Grilla
  Grilla(SO: string, IdEstado: string, IdUsuario: string) {
    if (SO == undefined || SO == '') {
      SO = '0';
    }
    this.ArregloGrilla = [];
    this.Servicios.consultaservidors('1', SO, '0', IdEstado, IdUsuario).subscribe(respu => {
      if (respu.length > 0) {
        this.ArregloGrilla = respu;
      }
    })
  }
  Limpiar() {
    //Limpiar filtros
    this.IdEstado = '2';
    this.IdUsuario = '0';
    this.lblNombreservidor = '';
    this.lblSO = '';

    //Limpiar variables agregar servidor
    this.LblNombreAgregar = "";
    this.LblNombreAgregar = "";
    this.LblObservacionAgregar = "";
    this.LblSoftwareAgregar = "";
    this.LblSOAgregar = "";
    this.IdEstadoAgregar = "2";
    this.LblProcesadorAgregar = "";
    this.LblDiscoDuroAgregar = "";
    this.LblRamAgregar = "";
    this.Id_TipoServidorAgregar = "0";
    this.IdServidorAloja = "0";
    this.LblIpPublicaAgregar = "";
    this.LblAplicacionesIISAgregar = "";
    this.LblBaseDeDatosAgregar = "";
    this.LblUsuariosAgregar = "";
    this.LblPasswordAgregar = "";


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

    this.Grilla(this.lblSO, this.IdEstado, this.IdUsuario);
  }
  //Descargar Pdf
  DescargarDatosPdf(templateMensaje: TemplateRef<any>) {
    const doc = new jsPDF('l', 'px', 'a3');
    autoTable(doc, {
      styles: { fillColor: [236, 240, 241] },
      columnStyles: {
        1: { cellWidth: 96 },
        2: { cellWidth: 96 },
        3: { cellWidth: 96 },
        4: { cellWidth: 96 },
        5: { cellWidth: 96 },
        6: { cellWidth: 96 },
        7: { cellWidth: 96 },
        8: { cellWidth: 96 },
        9: { cellWidth: 96 }
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
        ['Ip', 'Nombre', 'Sistema Operativo', 'Software', 'Estado', 'Ultima mod', 'Observación', 'Tipo Servidor', 'Fecha ultima Mod'],
      ]
    })

    if (this.ArregloGrilla.length > 0) {
      this.ArregloGrilla.forEach(function (respuesta: any) {

        var Res = [respuesta.Ip_S, respuesta.Nombre, respuesta.SO, respuesta.Software, respuesta.Estado, respuesta.UsuarioUltMod, respuesta.Observacion, respuesta.TipoServidor,
        respuesta.Fecha_Ult_Mod];

        autoTable(doc, {
          margin: { top: 0, bottom: 0 },
          columnStyles: {
            1: { cellWidth: 96 },
            2: { cellWidth: 96 },
            3: { cellWidth: 96 },
            4: { cellWidth: 96 },
            5: { cellWidth: 96 },
            6: { cellWidth: 96 },
            7: { cellWidth: 96 },
            8: { cellWidth: 96 },
            9: { cellWidth: 96 }
          },
          body:
            [
              Res
            ]
        })
      });

      doc.save('Registro servidores - ' + this.Fecha + '.pdf')
    } else {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = 'No existen registros disponibles, por favor seleccione otros filtros';
    }
  }
  //Descargar Excel
  BtnExportarExcel(templateMensaje: TemplateRef<any>) {
    if (this.ArregloGrilla.length > 0) {
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet("Registro servidores");
      let header = ['Ip', 'Nombre', 'Sistema Operativo', 'Software', 'Estado', 'Ultima mod', 'Observación', 'Tipo Servidor', 'Fecha ultima Mod'];
      worksheet.addRow(header);

      for (let x1 of this.ArregloGrilla) {
        let temp = []
        temp.push(x1['Ip_S'])
        temp.push(x1['Nombre'])
        temp.push(x1['SO'])
        temp.push(x1['Software'])
        if (x1['Estado'] == 1) {
          temp.push('Exitoso')
        } else {
          temp.push('Error')
        }
        temp.push(x1['UsuarioUltMod'])
        temp.push(x1['Observacion'])
        temp.push(x1['TipoServidor'])
        temp.push(x1['Fecha_Ult_Mod'])

        worksheet.addRow(temp)
      }

      let fname = "Registro servidores - " + this.Fecha;

      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, fname + '.xlsx');
      });
    } else {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = 'No existen registros disponibles, por favor seleccione otros filtros';
    }
  }
  //Popap agregar
  BtnNuevo(templateAgregar: TemplateRef<any>) {
    this.modalServiceDos.open(templateAgregar, { size: 'xl' });
  }

  AgregarServidor(templateMensaje: TemplateRef<any>) {
    if (this.LblIpServidorAgregar == undefined || this.LblIpServidorAgregar == '' || this.LblNombreAgregar == undefined || this.LblNombreAgregar == '' || this.LblSOAgregar == undefined || this.LblSOAgregar == '' ||
      this.LblSoftwareAgregar == undefined || this.LblSoftwareAgregar == '' || this.IdEstadoAgregar == undefined || this.IdEstadoAgregar == '' || this.Id_TipoServidorAgregar == undefined || this.Id_TipoServidorAgregar == ''
      || this.LblObservacionAgregar == undefined || this.LblObservacionAgregar == '' || this.LblUsuariosAgregar == undefined || this.LblUsuariosAgregar == '' || this.LblPasswordAgregar == undefined || this.LblPasswordAgregar == ''
      || this.IdServidorAloja == undefined || this.IdServidorAloja == '') {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = "Por favor complete los campos a agregar";
    } else {
      var auxservAloja = null;
      if (this.IdServidorAloja != "0") {
        auxservAloja = this.IdServidorAloja;
      }

      const InsertaServidor = {
        IdServidor: 0,
        IpServidor: this.LblIpServidorAgregar,
        Nombre: this.LblNombreAgregar,
        Observacion: this.LblObservacionAgregar,
        Software: this.LblSoftwareAgregar,
        SistemaOper: this.LblSOAgregar,
        Estado: this.IdEstadoAgregar,
        Procesador: this.LblProcesadorAgregar,
        DiscoDuro: this.LblDiscoDuroAgregar,
        RAM: this.LblRamAgregar,
        IdTipoServ: this.Id_TipoServidorAgregar,
        ServidorAloja: auxservAloja,
        IpPublica: this.LblIpPublicaAgregar,
        AplicacionesIIS: this.LblAplicacionesIISAgregar,
        BaseDeDatos: this.LblBaseDeDatosAgregar,
        UserServidor: this.LblUsuariosAgregar,
        Password: this.LblPasswordAgregar,
        IdUsuario: this.IdUsuarioCookies
      }
      this.Servicios.insertaserv('3', InsertaServidor).subscribe(respu => {
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = respu;

        this.Limpiar();
        this.modalServiceDos.dismissAll();


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
















  ArrVerDetalles: any = [];
  //Ver detalle
  VerDetalle(templateVerDetalles: TemplateRef<any>, templateMensaje: TemplateRef<any>, ArGrilla: any) {
    this.ArrVerDetalles = ArGrilla;
    if (ArGrilla.TieneIpPublica == 'SI') {
      this.checkboxIpAgregar = true;
    }
    if (ArGrilla.TieneIIS == 'SI') {
      this.checkboxAppsAgregar = true;
    }
    if (ArGrilla.TieneBD == 'SI') {
      this.checkboxBDAgregar = true;
    }
    if (ArGrilla.TipoServ == "1") {
      this.DisableServidorAlojaEditar = false;
    }

    this.IpServidorVer = ArGrilla.Ip_S;
    this.NombreServidorVer = ArGrilla.Nombre;
    this.AuxiliarDiv = false;
    this.modalServiceDos.open(templateVerDetalles, { size: 'md' });
    this.ArrListaVerdetalles = [];
    this.IdServidor = ArGrilla.Id_S;
  }



  //Editar Servidor
  EditarServidor(templateEditarServidor: TemplateRef<any>, Array: any) {
    this.ArrayEditar = Array;
    console.log(this.ArrayEditar)


    this.checkboxAppsEditar = false;
    this.checkboxBDeDitar = false;
    this.checkboxIpEditar = false;

    if (this.ArrayEditar.AplicacionesIIS != undefined || this.ArrayEditar.AplicacionesIIS != null) {
      this.checkboxAppsEditar = true;
    }
    if (this.ArrayEditar.BaseDeDatos != undefined || this.ArrayEditar.BaseDeDatos != null) {
      this.checkboxBDeDitar = true;
    }
    if (this.ArrayEditar.IpPublica != undefined || this.ArrayEditar.IpPublica != null) {
      this.checkboxIpEditar = true;
    }
    if (this.ArrayEditar.TipoServ == "1") {
      this.DisableServidorAlojaEditar = true;
    } else {
      this.DisableServidorAlojaEditar = false;
    }

    this.modalServiceDos.open(templateEditarServidor, { size: 'xl' });
    this.IdServidorServ = Array.Id_S;
    this.LblIpServidorEdit = Array.Ip_S;
    this.LblNombreEdit = Array.Nombre;
    this.LblSOEdit = Array.SO;
    this.LblSoftwareEdit = Array.Software;
    this.IdEstadoAgregarEdit = Array.Estado;
    this.Id_TipoServidorEdit = Array.IdTipoServidor;
    this.LblObservacionEdit = Array.Observacion;
    this.LblUsuariosEdit = Array.Usuario_Ser;
    this.LblPasswordEdit = Array.Password;
    if (Array.Servidor_Aloja == undefined || Array.Servidor_Aloja == '') {
      this.IdServidorAlojaEdit = '0';
    } else {
      this.IdServidorAlojaEdit = Array.Servidor_Aloja;
    }
  }
  UpdateServDos(templateMensaje: TemplateRef<any>, Ip: string, app: string, bd: string) {

    var auxIpPublic: any;
    var auxapp: any;
    var auxbd: any;

    if (Ip == '') {
      auxIpPublic = null;
    } else {
      auxIpPublic = Ip;
    }
    if (app == '') {
      auxapp = null;
    } else {
      auxapp = app;
    }
    if (bd == '') {
      auxbd = null;
    } else {
      auxbd = bd;
    }
    if (this.ArrayEditar.Servidor_Aloja == 'null') {
      this.ArrayEditar.Servidor_Aloja = null;
    }

    const Update = {
      IdServidor: this.IdServidorServ,
      IpServidor: this.LblIpServidorEdit,
      Nombre: this.LblNombreEdit,
      Observacion: this.LblObservacionEdit,
      Software: this.LblSoftwareEdit,
      SistemaOper: this.LblSOEdit,
      Estado: this.IdEstadoAgregarEdit,
      Procesador: this.ArrayEditar.Procesador,
      DiscoDuro: this.ArrayEditar.DiscoDuro,
      RAM: this.ArrayEditar.RAM,
      IdTipoServ: this.ArrayEditar.IdTipoServidor,
      ServidorAloja: this.ArrayEditar.Servidor_Aloja,
      IpPublica: auxIpPublic,
      AplicacionesIIS: auxapp,
      BaseDeDatos: auxbd,
      UserServidor: this.ArrayEditar.Usuario_Ser,
      Password: this.ArrayEditar.Password,
      IdUsuario: this.IdUsuarioCookies
    }
    console.log(Update)
    this.Servicios.actualizaservdos('2', Update).subscribe(respu => {
      this.Grilla(this.lblSO, this.IdEstado, this.IdUsuario);
      if (respu == 'Servidor actualizado exitosamente.') {
        this.modalServiceDos.dismissAll();
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = respu;
      } else {
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = 'Por favor verefique los datos a actualizar.';
      }
    })
  }




  //Popap agregar hardware
  AbrirpopapHardware(templateAgregarHARDWARE: TemplateRef<any>) {
    this.modalAgregarHardware = this._modalService.show(templateAgregarHARDWARE);
  }
  InsetHardware(templateMensaje: TemplateRef<any>) {
    const Insert = {
      Id_S: this.IdServidor,
      DiscoDuro: this.LblDiscoDuro,
      RAM: this.LblRam,
      Procesador: this.LblProcesador
    }
    this.Servicios.insertarhardserv('3', Insert).subscribe(respu => {
      if (respu == 'Hardware de servidor registrado exitosamente.') {

        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = respu;

        this.modalAgregarHardware.hide();

        this.ArrListaVerdetalles = [];
        this.Servicios.consultahardware(this.IdServidor, '0', '0', '0').subscribe(respu => {
          if (respu.length > 0) {
            this.ArrListaVerdetalles = respu;
            this.AuxiliarDiv = false;
          }
        })

      } else {

        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = 'Por favor verefique los datos a ingresar.';
      }
    })


  }






  //Descargar pdf de ver detalles
  DescargaPDF() {
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3


    };


    var DATAg = document.getElementById('htmlData_');
    if (DATAg != null) {
      html2canvas(DATAg, options).then((canvas) => {
        var imgDos = canvas.toDataURL('image/PNG');
        var imgPropDso = (doc as any).getImageProperties(imgDos);

        var pdfWidthDso = doc.internal.pageSize.getWidth() - 2 * 15;
        var pdfHeightDso = (imgPropDso.height * pdfWidthDso) / imgPropDso.width;

        doc.addImage(imgDos, 'PNG', 15, 15, pdfWidthDso, pdfHeightDso, undefined, 'FAST');

        doc.save('Detalles servidor.pdf');//Agregar el nombre de el servidor mas la fecha
      })
    }
  }


  //Eliminar servidor
  EliminaServidor(templateMensaje: TemplateRef<any>, Arr: any) {
    const delet = {
      Id_S: Arr.Id_S,
      Nombre: Arr.Nombre
    }
    this.Servicios.eliminaservidor('4', delet).subscribe(respu => {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = respu;
      this.Limpiar();
    })
  }
  EliminaHardwareServidor(templateMensaje: TemplateRef<any>, Arr: any) {

    const delet = {
      Id_S: Arr.IdentificadorServidor
    }
    this.Servicios.eliminahardserv('4', delet).subscribe(respu => {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = respu;
      this.ArrListaVerdetalles = [];
      this.Servicios.consultahardware(this.IdServidor, '0', '0', '0').subscribe(respu => {
        if (respu.length > 0) {
          this.ArrListaVerdetalles = respu;
          this.AuxiliarDiv = false;
        }
      })
    })
  }


  //Editar Ver detalles
  AbrirPopap(templateEditarVerDetalles: TemplateRef<any>, Arr: any) {
    this.modalEditarDetalle = this._modalService.show(templateEditarVerDetalles);
    this.IdServidorEditDetalle = Arr.Id_S;
    this.LblDiscoDuroEdit = Arr.DiscoDuro;
    this.LblRamEdit = Arr.RAM;
    this.LblProcesadorEdit = Arr.Procesador;
    this.LblUsuariosEdit = Arr.Usuario_Ser;
    this.LblPasswordEdit = Arr.Password;
    if (Arr.Servidor_Aloja == undefined || Arr.Servidor_Aloja == '') {
      this.IdServidorAlojaEdit = '0';
    } else {
      this.IdServidorAlojaEdit = Arr.Servidor_Aloja;
    }
  }
  EditarVerDetalles(templateMensaje: TemplateRef<any>) {
    const UpdateSerDetalles = {
      Id_S: this.IdServidorEditDetalle,
      DiscoDuro: this.LblDiscoDuroEdit,
      RAM: this.LblRamEdit,
      Procesador: this.LblProcesadorEdit,
      Usuario_Ser: this.LblUsuariosEdit,
      Password: this.LblPasswordEdit,
      Servidor_Aloja: this.IdServidorAlojaEdit,
      Id_U: this.cookies.get('IdUsuario'),
      Fecha_Ult_Mod: this.Fecha
    }
    this.Servicios.updatedetllserv(UpdateSerDetalles).subscribe(respu => {

      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = respu;
      this.modalEditarDetalle.hide();

      this.ArrListaVerdetalles = [];
      this.Servicios.consdetallserv('1', this.IdServidorEditDetalle).subscribe(respu => {
        if (respu.length > 0) {
          this.ArrListaVerdetalles = respu;
        }
      })
    })

  }


  ChangueAgregarTipoServidor(IdTipoServ: String) {
    if (IdTipoServ != '0') {
      var splitted = IdTipoServ.split(":");
      if (splitted[1].trim() == '1') {
        this.IdServidorAloja = '0';
        this.DisableServidorAlojaAgregar = false;
      }
    }
  }


  ChangueEditTipoServidor(item: any) {

    if (item.TipoServ == "1") {
      this.ArrayEditar.TipoServ = "2";
    } else if (item.TipoServ == "2") {
      this.ArrayEditar.TipoServ = "1";
    }
    if (item.TipoServ.trim() == "1") {
      this.ArrayEditar.Servidor_Aloja = 'null';
      this.DisableServidorAlojaEditar = true;
    } else {
      this.DisableServidorAlojaEditar = false;
    }
  }


  ChangeCheck(Check: boolean, Id: string, Campo: string) {
    if (Check == false) {
      const input = document.getElementById(Id) as HTMLInputElement | null;
      if (input != null) {
        input.value = "";
        Campo = '';
      }
    }
  }
}




















