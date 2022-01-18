import { Component, OnInit, TemplateRef } from '@angular/core';
import { MetodosGlobalesService } from '../core/metodosglobales.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Workbook } from "exceljs";
import { saveAs } from 'file-saver';

import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pgbackups',
  templateUrl: './pgbackups.component.html',
  styleUrls: ['./pgbackups.component.css']
})
export class PgbackupsComponent implements OnInit {

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

  //Variables lista Usuario
  IdUsuario: string;
  ArregloListaUsuario: any;

  //Variable lista cliente
  IdCliente: string;
  ArregloListaCliente: any;

  //Variables lista editar
  modalEditar: BsModalRef;

  NombreBackup: string;
  Clientee: string;
  Ambiente: string;
  Periodicidad: string;
  Servidor: string;
  TipoBackup: string;
  Usuario: string;
  FechaUlt: string;

  //Variables Ver
  modalVer: BsModalRef;

  //Variables Fecha
  Dia = new Date().getDate();
  Mes = new Date().getMonth() + 1;
  Año = new Date().getFullYear();

  Fecha: string = this.Año + '-' + this.Mes + '-' + this.Dia;

  //Variables agregar

  constructor(private _modalService: BsModalService,
    private Servicios: MetodosGlobalesService,
    private modalServiceDos: NgbModal
  ) { }

  ngOnInit(): void {
    this.IdUsuario = '0';
    this.IdCliente = '0';

    this.Grilla(this.LblIp, this.NombreBCK, this.IdUsuario);
    this.ListaUsuario();
    this.ListaCliente();
  }

  //Grilla
  Grilla(Ip: string, Nombre: string, IdUsuario: string) {
    if (Ip == undefined || Ip == '') {
      Ip = '0';
    }

    if (Nombre == undefined || Nombre == '') {
      Nombre = '0';
    }

    if (IdUsuario == undefined || IdUsuario == '') {
      IdUsuario = '0';
    }
    this.ArregloGrilla = [];
    this.AuxiliadorGrilla = false;
    this.Servicios.consultabackup(Nombre, Ip, IdUsuario, '0').subscribe(respu => {
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

    this.Grilla(this.LblIp, this.NombreBCK, this.IdUsuario);
  }

  BtnNuevo(templateAgregar: TemplateRef<any>, templateMensaje: TemplateRef<any>) {
    this.modalAgregar = this._modalService.show(templateAgregar)
  }

  ListaUsuario() {
    this.ArregloListaUsuario = [];
    this.Servicios.consultausuarios().subscribe(respu => {
      this.ArregloListaUsuario = respu;
    })
  }

  ListaCliente() {
    this.ArregloListaCliente = [];
    this.Servicios.consultaproyect('1').subscribe(respu => {
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
        let header = ["Ip", "Nombre", "Cliente", "Ambiente", "Tipo", "Periodicidad", "Usuario Mod", "Fecha Ultima Mod"];
        worksheet.addRow(header);

        for (let x1 of respu) {
          let temp = []
          temp.push(x1['IpServidor'])
          temp.push(x1['Nombre'])
          temp.push(x1['NombreProyecto'])
          temp.push(x1['Ambiente'])
          temp.push(x1['Descripcion'])
          temp.push(x1['Periodicidad'])
          temp.push(x1['UsuarioModifi'])
          temp.push(x1['Fecha_Ult_Mod'])

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
          data.cell.styles.fillColor = [255, 105, 105];
        }
      },
      margin: { top: 10 },
      body: [
        ['Ip', 'Nombre', 'Cliente', 'Ambiente', 'Tipo', 'Periodicidad', 'Usuario Mod', 'Fecha Ultima Mod'],
      ]
    })

    this.ArregloGrilla.forEach(function (respuesta: any) {

      var Res =
        [respuesta.IpServidor, respuesta.Nombre, respuesta.NombreProyecto, respuesta.Ambiente, respuesta.Descripcion, respuesta.Periodicidad, respuesta.UsuarioModifi
          , respuesta.Fecha_Ult_Mod];

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
  VerDetalle(templateVerDetalles: TemplateRef<any>) {
    this.modalServiceDos.open(templateVerDetalles, { size: 'xl' });
  }

  AgregarBck(){
    const datosinsert =
    {
      Nombre: "Prueba agregar",
      Id_PRY: 1,
      Ambiente : "Prueba",
      Periodicidad: "Prueba",
      Id_Servidor: 1,
      Id_Tipo_BCK: 1,
      Id_Usuario: 2,
      Fecha_Ult_Mod: "2022-01-18"
    }
    this.Servicios.insertarbackup('3', datosinsert).subscribe(respu => {
      if (respu.length > 0) {
        this.ArregloGrilla = respu;
        this.AuxiliadorGrilla = true;
      }
    })
  }

  Editarbackup(templateEditarBackup: TemplateRef<any>, Array: any){
    this.modalVer = this._modalService.show(templateEditarBackup)
    this.NombreBackup = Array.Nombre;
    this.Clientee = Array.NombreProyecto;
    this.Ambiente = Array.Ambiente;
    this.Periodicidad = Array.Periodicidad;
    this.Servidor = Array.IpServidor;
    this.TipoBackup = Array.Descripcion;
    this.Usuario = Array.UsuarioModifi;
    this.FechaUlt = Array.Fecha_Ult_Mod;
  }
}
