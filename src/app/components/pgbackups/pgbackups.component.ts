import { Component, OnInit, TemplateRef } from '@angular/core';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Workbook } from "exceljs";
import { saveAs } from 'file-saver';
import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-pgbackups',
  templateUrl: './pgbackups.component.html',
  styleUrls: ['./pgbackups.component.css']
})
export class PgbackupsComponent implements OnInit {
  //Usuario
  IdUsuarioCookies: string = this.cookies.get('IdUsuario');

  //Variables globales
  AuxiliadorGrilla: boolean;
  AuxOrganizar: boolean;
  modalMensaje: BsModalRef;
  lblModalMsaje: string;

  //Variables Ayuda Ip
  LblIp: string;

  //Variables ayuda NombreBck
  NombreBCK: string;

  //Variables grilla
  ArregloGrilla: any;

  //Variables agregar
  modalAgregar: BsModalRef;
  LblAgregarNombre: string;
  IdAgregarCliente: string;
  LblAgregarAmbiente: string;
  LblAgregarPeriodicidad: string;
  IdAgregarServidor: string;
  RutaAgregar: string;
  EstadoAgregar: string = '0';
  DescripcionAgregar: string = '';

  //Variables lista Usuario
  IdUsuario: string;
  ArregloListaUsuario: any;

  //Variables lista TipoBackup
  IdAgregarTipoBackup: string;
  ArregloListaTipoBackup: any;

  //Variable lista cliente
  IdCliente: string;
  ArregloListaCliente: any;

  //Variables lista editar
  modalEditar: BsModalRef;

  NombreBackup: string;
  Ambiente: string;
  Periodicidad: string;
  Servidor: string;
  TipoBackup: string;
  Usuario: string;
  IdClientee: string;
  IdServidor: string;
  IdTipoBackup: string;
  IdBackupEdit: string;
  RutaEdit: string;
  EstadoEdit: string = '0';
  DescripcionEdit: string = '';

  //Variables Ver
  modalVer: BsModalRef;
  IdBackupSelect: number;

  //Titulos ver
  IpBackupVer: string;
  NombreBackupVer: string;
  PeriodicidadVer: string;

  //Variables consultareguistri backup
  ArregloGrillaReguistroBck: any;

  //Variables Fecha
  Dia = new Date().getDate();
  Mes = new Date().getMonth() + 1;
  Año = new Date().getFullYear();

  Fecha: string = this.Año + '-' + this.Mes + '-' + this.Dia;

  //Variables servidor
  ArregloListaServidor: any;

  //Variables agregar registro bck
  LblObservaciones: string;
  IdEstado: string;

  constructor(private _modalService: BsModalService,
    private Servicios: MetodosGlobalesService,
    private modalServiceDos: NgbModal,
    private cookies: CookieService
  ) { }

  ngOnInit(): void {
    this.IdUsuario = '0';
    this.IdCliente = '0';
    this.IdEstado = '2';

    //Inicializar agregar
    this.IdAgregarCliente = '0';
    this.LblAgregarPeriodicidad = '0';
    this.IdAgregarServidor = '0';
    this.IdAgregarTipoBackup = '0';

    this.Grilla(this.LblIp, this.NombreBCK, this.IdCliente);
    this.ListaUsuario();
    this.ListaCliente();
    this.ListaTipoServidor();
    this.ListaTipoBackup();
  }

  //Grilla
  Grilla(Ip: string, Nombre: string, IdCliente: string) {
    if (Ip == undefined || Ip == '') {
      Ip = '0';
    }
    if (Nombre == undefined || Nombre == '') {
      Nombre = '0';
    }
    if (IdCliente == undefined || IdCliente == '') {
      IdCliente = '0';
    }
    this.ArregloGrilla = [];
    this.AuxiliadorGrilla = false;
    this.Servicios.consultabackup(Nombre, Ip, '0', IdCliente).subscribe(respu => {
      if (respu.length > 0) {
        this.ArregloGrilla = respu;
        this.AuxiliadorGrilla = true;
      }
    })
  }

  OrdenarIpServidor() {
    if (this.AuxOrganizar == true) {
      this.AuxOrganizar = false;
      this.ArregloGrilla.sort((a: { IpServidor: string; }, b: { IpServidor: string; }) => a.IpServidor.localeCompare(b.IpServidor));
    } else {
      this.AuxOrganizar = true;
      this.ArregloGrilla.sort((a: { IpServidor: string; }, b: { IpServidor: string; }) => b.IpServidor.localeCompare(a.IpServidor));
    }
  }

  OrdenarNombre() {
    if (this.AuxOrganizar == true) {
      this.AuxOrganizar = false;
      this.ArregloGrilla.sort((a: { Nombre: string; }, b: { Nombre: string; }) => a.Nombre.localeCompare(b.Nombre));
    } else {
      this.AuxOrganizar = true;
      this.ArregloGrilla.sort((a: { Nombre: string; }, b: { Nombre: string; }) => b.Nombre.localeCompare(a.Nombre));
    }
  }

  OrdenarNombreProyecto() {
    if (this.AuxOrganizar == true) {
      this.AuxOrganizar = false;
      this.ArregloGrilla.sort((a: { NombreProyecto: string; }, b: { NombreProyecto: string; }) => a.NombreProyecto.localeCompare(b.NombreProyecto));
    } else {
      this.AuxOrganizar = true;
      this.ArregloGrilla.sort((a: { NombreProyecto: string; }, b: { NombreProyecto: string; }) => b.NombreProyecto.localeCompare(a.NombreProyecto));
    }
  }

  OrdenarAmbiente() {
    if (this.AuxOrganizar == true) {
      this.AuxOrganizar = false;
      this.ArregloGrilla.sort((a: { Ambiente: string; }, b: { Ambiente: string; }) => a.Ambiente.localeCompare(b.Ambiente));
    } else {
      this.AuxOrganizar = true;
      this.ArregloGrilla.sort((a: { Ambiente: string; }, b: { Ambiente: string; }) => b.Ambiente.localeCompare(a.Ambiente));
    }
  }

  OrdenarDescripcion() {
    if (this.AuxOrganizar == true) {
      this.AuxOrganizar = false;
      this.ArregloGrilla.sort((a: { Descripcion: string; }, b: { Descripcion: string; }) => a.Descripcion.localeCompare(b.Descripcion));
    } else {
      this.AuxOrganizar = true;
      this.ArregloGrilla.sort((a: { Descripcion: string; }, b: { Descripcion: string; }) => b.Descripcion.localeCompare(a.Descripcion));
    }
  }

  OrdenarPeriodicidad() {
    if (this.AuxOrganizar == true) {
      this.AuxOrganizar = false;
      this.ArregloGrilla.sort((a: { Periodicidad: string; }, b: { Periodicidad: string; }) => a.Periodicidad.localeCompare(b.Periodicidad));
    } else {
      this.AuxOrganizar = true;
      this.ArregloGrilla.sort((a: { Periodicidad: string; }, b: { Periodicidad: string; }) => b.Periodicidad.localeCompare(a.Periodicidad));
    }
  }

  OrdenarUsuarioModifi() {
    if (this.AuxOrganizar == true) {
      this.AuxOrganizar = false;
      this.ArregloGrilla.sort((a: { UsuarioModifi: string; }, b: { UsuarioModifi: string; }) => a.UsuarioModifi.localeCompare(b.UsuarioModifi));
    } else {
      this.AuxOrganizar = true;
      this.ArregloGrilla.sort((a: { UsuarioModifi: string; }, b: { UsuarioModifi: string; }) => b.UsuarioModifi.localeCompare(a.UsuarioModifi));
    }
  }

  OrdenarFecha_Ult_Mod() {
    if (this.AuxOrganizar == true) {
      this.AuxOrganizar = false;
      this.ArregloGrilla.sort((a: { Fecha_Ult_Mod: string; }, b: { Fecha_Ult_Mod: string; }) => a.Fecha_Ult_Mod.localeCompare(b.Fecha_Ult_Mod));
    } else {
      this.AuxOrganizar = true;
      this.ArregloGrilla.sort((a: { Fecha_Ult_Mod: string; }, b: { Fecha_Ult_Mod: string; }) => b.Fecha_Ult_Mod.localeCompare(a.Fecha_Ult_Mod));
    }
  }
  Limpiar() {
    this.LblIp = '';
    this.NombreBCK = '';
    this.IdUsuario = '0';
    this.IdCliente = '0';

    //Limpiar agregar
    this.LblAgregarNombre = '';
    this.IdAgregarCliente = '0';
    this.LblAgregarAmbiente = '';
    this.LblAgregarPeriodicidad = '0';
    this.IdAgregarServidor = '0';
    this.IdAgregarTipoBackup = '0';

    this.Grilla(this.LblIp, this.NombreBCK, this.IdCliente);
  }

  BtnNuevo(templateAgregar: TemplateRef<any>) {
    this.modalAgregar = this._modalService.show(templateAgregar);
    this.modalAgregar.setClass('modal-lg');
  }

  ListaUsuario() {
    this.ArregloListaUsuario = [];
    this.Servicios.conscusuario('1', '0', '0', '0', '0', '0').subscribe(respu => {
      this.ArregloListaUsuario = respu;
    })
  }

  ListaCliente() {
    this.ArregloListaCliente = [];
    this.Servicios.consultaproyect('1', '0', '0').subscribe(respu => {
      this.ArregloListaCliente = respu;
    })
  }
  //Descargar Excel
  BtnExportarExcel(templateMensaje: TemplateRef<any>) {
    var Ip = this.LblIp;
    var Nombre = this.NombreBCK;
    if (Ip == undefined || Ip == '') {
      Ip = '0';
    }

    if (Nombre == undefined || Nombre == '') {
      Nombre = '0';
    }
    this.Servicios.consultabackup(Nombre, Ip, '0', '0').subscribe(respu => {
      if (respu.length > 0) {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet("Registro backup");
        let header = ["Ip", "Nombre", "Proyecto", "Ambiente", "Tipo", "Periodicidad", "Fecha último backup", "Fecha próximo backup"];
        worksheet.addRow(header);

        for (let x1 of respu) {
          let temp = []
          temp.push(x1['IpServidor'])
          temp.push(x1['Nombre'])
          temp.push(x1['NombreProyecto'])
          temp.push(x1['Ambiente'])
          temp.push(x1['Descripcion'])
          temp.push(x1['Periodicidad'])
          temp.push(x1['FechaUltimoReg'])
          temp.push(x1['ProximoBack'])

          worksheet.addRow(temp)
        }

        let fname = "Registro backup - " + this.Fecha;

        workbook.xlsx.writeBuffer().then((data) => {
          let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, fname + '.xlsx');
        });

      } else {
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
        1: { cellWidth: 108 },
        2: { cellWidth: 108 },
        3: { cellWidth: 108 },
        4: { cellWidth: 108 },
        5: { cellWidth: 108 },
        6: { cellWidth: 108 },
        7: { cellWidth: 108 },
        8: { cellWidth: 108 }
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
        ["Ip", "Nombre", "Proyecto", "Ambiente", "Tipo", "Periodicidad", "Fecha último backup", "Fecha próximo backup"],
      ]
    })

    this.ArregloGrilla.forEach(function (respuesta: any) {

      var Res =
        [respuesta.IpServidor, respuesta.Nombre, respuesta.NombreProyecto, respuesta.Ambiente, respuesta.Descripcion, respuesta.Periodicidad, respuesta.FechaUltimoReg
          , respuesta.ProximoBack];

      autoTable(doc, {
        margin: { top: 0, bottom: 0 },
        columnStyles: {
          1: { cellWidth: 108 },
          2: { cellWidth: 108 },
          3: { cellWidth: 108 },
          4: { cellWidth: 108 },
          5: { cellWidth: 108 },
          6: { cellWidth: 108 },
          7: { cellWidth: 108 },
          8: { cellWidth: 108 }
        },
        body:
          [
            Res
          ]
      })
    });

    doc.save('Registro backups - ' + this.Fecha + '.pdf')

  }
  VerDetalle(templateVerDetalles: TemplateRef<any>, ArGrilla: any) {
    this.IpBackupVer = ArGrilla.IpServidor
    this.NombreBackupVer = ArGrilla.Nombre;
    this.PeriodicidadVer = ArGrilla.Periodicidad;
    this.modalServiceDos.open(templateVerDetalles, { size: 'xl' });
    const ConsultaRegistroBck =
    {
      Fecha: '0',
      Estado: 2,
      Usuario: 0
    }
    this.ArregloGrillaReguistroBck = [];
    this.IdBackupSelect = ArGrilla.Id_B;
    this.Servicios.consultaregistbck(this.IdBackupSelect, ConsultaRegistroBck).subscribe(respu => {
      if (respu.length > 0) {
        this.ArregloGrillaReguistroBck = respu;
      }
    })
  }

  AgregarBck(templateMensaje: TemplateRef<any>) {
    if (this.LblAgregarNombre == undefined || this.LblAgregarNombre == '' || this.IdAgregarCliente == undefined || this.IdAgregarCliente == ''
      || this.LblAgregarAmbiente == undefined || this.LblAgregarAmbiente == '' || this.LblAgregarPeriodicidad == undefined || this.LblAgregarPeriodicidad == '0'
      || this.IdAgregarServidor == undefined || this.IdAgregarServidor == '0' || this.IdAgregarTipoBackup == undefined || this.IdAgregarTipoBackup == '0'
      || this.RutaAgregar == undefined || this.RutaAgregar == '' || this.EstadoAgregar == undefined || this.EstadoAgregar == '0' || this.DescripcionAgregar == undefined || this.DescripcionAgregar == '') {

      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = "Por favor complete los campos a agregar";
    } else {
      const datosinsert =
      {
        IdBackup: 0,
        Nombre: this.LblAgregarNombre,
        IdProyecto: this.IdAgregarCliente,
        Ambiente: this.LblAgregarAmbiente,
        Periodicidad: this.LblAgregarPeriodicidad,
        Id_Servidor: this.IdAgregarServidor,
        IdTipoBackup: this.IdAgregarTipoBackup,
        IdUsuario: this.IdUsuarioCookies,
        Fecha: this.Fecha,
        Ruta: this.RutaAgregar,
        Descripcion: this.DescripcionAgregar,
        Estado: this.EstadoAgregar
      }
      console.log(datosinsert)
      this.Servicios.insertarbackup('3', datosinsert).subscribe(respu => {
        if (respu.length > 0) {
          this.modalMensaje = this._modalService.show(templateMensaje);
          this.lblModalMsaje = respu;
          this.Grilla(this.LblIp, this.NombreBCK, this.IdCliente);

          this.modalAgregar.hide();
          this.Limpiar();
        }
      })
    }
  }

  Editarbackup(templateEditarBackup: TemplateRef<any>, Array: any) {
    console.log(Array)
    this.modalVer = this._modalService.show(templateEditarBackup);
    this.modalVer.setClass('modal-lg');
    this.IdBackupEdit = Array.Id_B;
    this.IdClientee = Array.Id_PRY;
    this.NombreBackup = Array.Nombre;
    this.Ambiente = Array.Ambiente;
    this.Periodicidad = Array.Periodicidad;
    this.TipoBackup = Array.Descripcion;
    this.IdServidor = Array.Id_Servidor;
    this.IdTipoBackup = Array.Id_Tipo_BCK;

    this.RutaEdit = Array.Ruta;
    this.DescripcionEdit = Array.Descripcion;
    if (Array.Estado != undefined || Array.Estado != null) {
      this.EstadoEdit = Array.Estado;
    } else {
      this.EstadoEdit = '0';
    }
  }

  AgregarRegistroBackup(templateMensaje: TemplateRef<any>) {
    if (this.LblObservaciones == undefined || this.LblObservaciones == '' || this.IdEstado == undefined || this.IdEstado == '') {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = "Por favor complete los campos a agregar";
    } else {
      const insertaregistrobck = {
        Id_BCK: this.IdBackupSelect,
        Fecha: this.Fecha,
        Estado: this.IdEstado,
        Observaciones: this.LblObservaciones,
        Id_U: this.IdUsuarioCookies
      }
      this.Servicios.insertaregistbck(insertaregistrobck).subscribe(respu => {
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = respu;

        if (respu == "Registro ingresado exitosamente.") {
          this.LblObservaciones = '';
          this.IdEstado = '2';
          const ConsultaRegistroBck =
          {
            Fecha: '0',
            Estado: 2,
            Usuario: 0
          }
          this.ArregloGrillaReguistroBck = [];
          this.Servicios.consultaregistbck(this.IdBackupSelect, ConsultaRegistroBck).subscribe(respu => {
            if (respu.length > 0) {
              this.ArregloGrillaReguistroBck = respu;
            }
          })
        } else {
          this.LblObservaciones = '';
          this.IdEstado = '2';
        }
      })
    }
  }

  ListaTipoServidor() {
    this.ArregloListaServidor = [];
    this.Servicios.consultaservidors('1', '0', '0', '2', '0').subscribe(respu => {
      if (respu.length > 0) {
        this.ArregloListaServidor = respu;
      }
    })
  }
  ListaTipoBackup() {
    const ConsultaTipoB =
    {
      IdTipoBackup: "0",
      Descripcion: "0"
    }
    this.ArregloListaTipoBackup = [];
    this.Servicios.consultatipobck(ConsultaTipoB).subscribe(respu => {
      if (respu.length > 0) {
        this.ArregloListaTipoBackup = respu;
      }
    })
  }

  UpdateBck(templateMensaje: TemplateRef<any>) {
    const datosupdate =
    {
      IdBackup: this.IdBackupEdit,
      Nombre: this.NombreBackup,
      IdProyecto: this.IdClientee,
      Ambiente: this.Ambiente,
      Periodicidad: this.Periodicidad,
      Id_Servidor: this.IdServidor,
      IdTipoBackup: this.IdTipoBackup,
      IdUsuario: this.IdUsuarioCookies,
      Fecha: this.RutaEdit,
      Ruta: this.RutaAgregar,
      Descripcion: this.DescripcionAgregar,
      Estado: this.EstadoAgregar
    }
    this.Servicios.actualizabackup('2', datosupdate).subscribe(respu => {
      if (respu.length > 0) {
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = respu;
        this.Grilla(this.LblIp, this.NombreBCK, this.IdCliente);

        this.modalVer.hide()
      }
    })
  }

  EliminarRegBCK(templateMensaje: TemplateRef<any>, Arr: any) {
    const datosupdate =
    {
      Id_B: Arr.Id_B,
      Nombre: Arr.Nombre
    }
    this.Servicios.eliminabackup('4', datosupdate).subscribe(respu => {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = respu;
      this.Limpiar();
    })
  }
  EliminarRegistroBakup(templateMensaje: TemplateRef<any>, Arr: any) {
    const deleteregistros =
    {
      Id_BCK: Arr.Id_BCK,
      Fecha: Arr.Fecha
    }
    this.Servicios.eliminaregistbck('4', deleteregistros).subscribe(respu => {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = respu;
      const ConsultaRegistroBck =
      {
        Fecha: '0',
        Estado: 2,
        Usuario: 0
      }
      this.ArregloGrillaReguistroBck = [];
      this.Servicios.consultaregistbck(this.IdBackupSelect, ConsultaRegistroBck).subscribe(respu => {
        if (respu.length > 0) {
          this.ArregloGrillaReguistroBck = respu;
        }
      })
    })
  }
  EliminarRegistrosBakup(templateMensaje: TemplateRef<any>, Arr: any) {
    const deleteregistros =
    {
      Id_BCK: Arr,
      Fecha: '0'
    }
    this.Servicios.eliminaregistbck('4', deleteregistros).subscribe(respu => {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = respu;
      const ConsultaRegistroBck =
      {
        Fecha: '0',
        Estado: 2,
        Usuario: 0
      }
      this.ArregloGrillaReguistroBck = [];
      this.Servicios.consultaregistbck(this.IdBackupSelect, ConsultaRegistroBck).subscribe(respu => {
        if (respu.length > 0) {
          this.ArregloGrillaReguistroBck = respu;
        }
      })
    })
  }
}