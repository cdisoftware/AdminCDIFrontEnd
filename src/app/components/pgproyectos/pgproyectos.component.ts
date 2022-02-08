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

@Component({
  selector: 'app-pgproyectos',
  templateUrl: './pgproyectos.component.html',
  styleUrls: ['./pgproyectos.component.css']
})
export class PgproyectosComponent implements OnInit {

  constructor(private _modalService: BsModalService,
    private Servicios: MetodosGlobalesService,
    private modalServiceDos: NgbModal,
    private cookies: CookieService
  ) { }

  //Variables modal mensaje
  modalMensaje: BsModalRef;
  lblModalMsaje: string;

  //Variables consulta proyecto
  ArrayConsultaProyecto: any;
  LblNombre: string;
  IdCliente: string;
  //Agregar proyecto
  modalAgregarproyecto: BsModalRef;
  LblNombreAgrega: string;
  IdClienteAgrega: string;
  //Edita proyecto
  modalEditaproyecto: BsModalRef;
  LblNombreEdit: string;
  IdClienteEdit: string;
  IdProyectEdit: string;


  //Variables lista cliente
  Arraylistacliente: any;

  //Variables consulta cliente
  ArrayConsultaCliente: any;
  LblDescripcion: string;
  //Variables agregar
  modalAgregarcliente: BsModalRef;
  LblDescripcionAgrega: string;
  //Variables editar
  modalEditarcliente: BsModalRef;
  LblDescripcionEdit: string;
  IdClienteEditcliente: string;

  //Variables Fecha
  Dia = new Date().getDate();
  Mes = new Date().getMonth() + 1;
  Año = new Date().getFullYear();

  Fecha: string = this.Año + '-' + this.Mes + '-' + this.Dia;

  //Variables grilla dinamica
  IdClienteGrillaDinamica: string;
  IdProyectoGrillaDinamica: string;
  ArrayGrilla: any;
  NomCliente: string;
  NomProyecto: string;
  AuxiliarTablaDinamica: boolean;

  ngOnInit(): void {
    this.AuxiliarTablaDinamica = false;
    this.consultaproyectos(this.LblNombre, this.IdCliente);
    this.IdCliente = '0';

    this.consultaclientes(this.LblDescripcion);
    this.listacliente();

    //Agrega
    this.IdClienteAgrega = '0';
    //Edit
    this.IdClienteEdit = '0';
  }
  //Consultas
  consultaproyectos(Nombre: string, IdCliente: string) {
    if (Nombre == undefined || Nombre == '') {
      Nombre = '0';
    }
    if (IdCliente == undefined || IdCliente == '') {
      IdCliente = '0';
    }
    this.ArrayConsultaProyecto = [];
    this.Servicios.consultaproyect('1', Nombre, IdCliente).subscribe(respu => {
      if (respu.length > 0) {
        this.ArrayConsultaProyecto = respu;
      }
    })
  }
  listacliente() {
    const Consulta = {
      Id_Cliente: 0,
      Descripcion: '0'
    }
    this.Arraylistacliente = [];
    this.Servicios.consultacliente(Consulta).subscribe(respu => {
      if (respu.length > 0) {
        this.Arraylistacliente = respu;
      }
    })
  }
  LimpiarProyectos() {
    this.IdClienteGrillaDinamica = '';
    this.LblNombre = '';
    this.IdCliente = '0';
    this.consultaproyectos(this.LblNombre, this.IdCliente);

    //Agregar
    this.LblNombreAgrega = '';
    this.IdClienteAgrega = '0';

    this.AuxiliarTablaDinamica = false;
  }

  consultaclientes(Descripcion: string) {
    if (Descripcion == undefined || Descripcion == '') {
      Descripcion = '0';
    }
    const Consulta = {
      Id_Cliente: 0,
      Descripcion: Descripcion
    }
    this.ArrayConsultaCliente = [];
    this.Servicios.consultacliente(Consulta).subscribe(respu => {
      if (respu.length > 0) {
        this.ArrayConsultaCliente = respu;
      }
    })
  }
  LimpiarClientes() {
    this.LblDescripcion = '';
    this.consultaclientes(this.LblDescripcion);
  }
  //Descargar PDF Proyectos
  DescargarDatosPdfProyecto() {
    const doc = new jsPDF('l', 'px', 'a3');

    autoTable(doc, {
      styles: { fillColor: [216, 216, 216] },
      columnStyles: {
        1: { cellWidth: 288 },
        2: { cellWidth: 288 },
        3: { cellWidth: 288 }
      },
      didParseCell: function (data) {
        var rows = data.table.body;
        if (data.row.index === 0) {
          data.cell.styles.fillColor = [255, 105, 105];
        }
      },
      margin: { top: 10 },
      body: [
        ['Identificador', 'Nombre', 'Cliente'],
      ]
    })

    this.ArrayConsultaProyecto.forEach(function (respuesta: any) {

      var Res =
        [respuesta.Id_PRY, respuesta.Nombre, respuesta.DescripcionCliente];

      autoTable(doc, {
        margin: { top: 0, bottom: 0 },
        columnStyles: {
          1: { cellWidth: 288 },
          2: { cellWidth: 288 },
          3: { cellWidth: 288 }
        },
        body:
          [
            Res
          ]
      })
    });

    doc.save('Registro proyectos - ' + this.Fecha + '.pdf')
  }
  DescargarDatosPdfCliente() {
    const doc = new jsPDF('l', 'px', 'a3');

    autoTable(doc, {
      styles: { fillColor: [216, 216, 216] },
      columnStyles: {
        1: { cellWidth: 432 },
        2: { cellWidth: 432 }
      },
      didParseCell: function (data) {
        var rows = data.table.body;
        if (data.row.index === 0) {
          data.cell.styles.fillColor = [255, 105, 105];
        }
      },
      margin: { top: 10 },
      body: [
        ['Identificador', 'Descripcion'],
      ]
    })

    this.ArrayConsultaCliente.forEach(function (respuesta: any) {

      var Res =
        [respuesta.Id_Cliente, respuesta.Descripcion];

      autoTable(doc, {
        margin: { top: 0, bottom: 0 },
        columnStyles: {
          1: { cellWidth: 432 },
          2: { cellWidth: 432 }
        },
        body:
          [
            Res
          ]
      })
    });

    doc.save('Registro clientes - ' + this.Fecha + '.pdf')
  }
  //Descargar EXCEL Proyecto
  BtnExportarExcelProyecto(templateMensaje: TemplateRef<any>) {
    var Nombre = this.LblNombre;
    if (Nombre == undefined || Nombre == '') {
      Nombre = '0';
    }
    var IdCliente = this.IdCliente
    if (IdCliente == undefined || IdCliente == '') {
      IdCliente = '0';
    }
    this.Servicios.consultaproyect('1', Nombre, IdCliente).subscribe(respu => {
      if (respu.length > 0) {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet("Registro proyectos");
        let header = ["Identificador", "Nombre", "Cliente"];
        worksheet.addRow(header);

        for (let x1 of respu) {
          let temp = []
          temp.push(x1['Id_PRY'])
          temp.push(x1['Nombre'])
          temp.push(x1['DescripcionCliente'])

          worksheet.addRow(temp)
        }

        let fname = "Registro proyectos - " + this.Fecha;

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
  //Descargar EXCEL Proyecto
  BtnExportarExcelCliente(Descripcion: string, templateMensaje: TemplateRef<any>) {
    const Consulta = {
      Id_Cliente: 0,
      Descripcion: Descripcion
    }
    this.Servicios.consultacliente(Consulta).subscribe(respu => {
      if (respu.length > 0) {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet("REGISTRO CLIENTES");
        let header = ["Identificador", "Descripcion"];
        worksheet.addRow(header);

        for (let x1 of respu) {
          let temp = []
          temp.push(x1['Id_Cliente'])
          temp.push(x1['Descripcion'])

          worksheet.addRow(temp)
        }

        let fname = "REGISTRO CLIENTES - " + this.Fecha;

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



  //Agregar proyecto
  BtnNuevoProyecto(templateAgregarproyecto: TemplateRef<any>) {
    this.modalAgregarproyecto = this._modalService.show(templateAgregarproyecto)
  }
  AgregarProyecto(templateMensaje: TemplateRef<any>) {
    if (this.LblNombreAgrega == undefined || this.LblNombreAgrega == '' || this.IdClienteAgrega == undefined || this.IdClienteAgrega == '0') {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = 'No fue posible ingresar este resultado, por favor valide los datos ingresados.';
    } else {
      const Agregar = {
        Nombre: this.LblNombreAgrega,
        Id_Cliente: this.IdClienteAgrega
      }
      this.Servicios.insertaproyecto('3', Agregar).subscribe(respu => {
        if (respu == 'Proyecto registrado exitosamente.') {
          this.modalAgregarproyecto.hide();
          this.modalMensaje = this._modalService.show(templateMensaje);
          this.lblModalMsaje = respu;

          this.LimpiarProyectos();
        } else {
          this.modalMensaje = this._modalService.show(templateMensaje);
          this.lblModalMsaje = 'No fue posible ingresar este resultado, por favor valide los datos ingresados.';
        }
      })
    }
  }
  //Agregar cliente
  BtnNuevoCliente(templateAgregarcliente: TemplateRef<any>) {
    this.modalAgregarcliente = this._modalService.show(templateAgregarcliente)
  }
  AgregarCliente(templateMensaje: TemplateRef<any>) {
    if (this.LblDescripcionAgrega == undefined || this.LblDescripcionAgrega == '') {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = 'No fue posible ingresar los datos, por favor valide los datos ingresados.';
    } else {
      const Agregar = {
        Descripcion: this.LblDescripcionAgrega
      }
      this.Servicios.insertarcliente('3', Agregar).subscribe(respu => {
        if (respu == 'Cliente registrado exitosamente.') {
          this.modalAgregarcliente.hide();
          this.modalMensaje = this._modalService.show(templateMensaje);
          this.lblModalMsaje = respu;

          this.LimpiarClientes();
        } else {
          this.modalMensaje = this._modalService.show(templateMensaje);
          this.lblModalMsaje = 'No fue posible ingresar los datos, por favor valide los datos ingresados.';
        }
      })
    }
  }





  //Editar proyecto
  BtnEditProyecto(templateEditarProyecto: TemplateRef<any>, Array: any) {
    this.modalEditaproyecto = this._modalService.show(templateEditarProyecto);
    this.LblNombreEdit = Array.Nombre;
    this.IdClienteEdit = Array.Id_Cliente;
    this.IdProyectEdit = Array.Id_PRY;
  }
  UpdateProyecto(templateMensaje: TemplateRef<any>) {
    if (this.LblNombreEdit == undefined || this.LblNombreEdit == '' || this.IdClienteEdit == undefined || this.IdClienteEdit == '0') {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = 'No fue posible actualizar los datos, por favor valide los datos ingresados.';
    } else {
      const update = {
        Id_PRY: this.IdProyectEdit,
        Nombre: this.LblNombreEdit,
        Id_Cliente: this.IdClienteEdit
      }
      this.Servicios.actualizaproyecto('2', update).subscribe(respu => {
        if (respu == 'Proyecto actualizado exitosamente.') {
          this.modalEditaproyecto.hide();
          this.modalMensaje = this._modalService.show(templateMensaje);
          this.lblModalMsaje = respu;

          this.LimpiarProyectos();
        } else {
          this.modalMensaje = this._modalService.show(templateMensaje);
          this.lblModalMsaje = 'No fue posible actualizar los datos, por favor valide los datos ingresados.';
        }
      })
    }
  }
  //Editar cliente
  BtnEditCliente(templateEditarCliente: TemplateRef<any>, Array: any) {
    this.modalEditarcliente = this._modalService.show(templateEditarCliente);
    this.LblDescripcionEdit = Array.Descripcion;
    this.IdClienteEditcliente = Array.Id_Cliente
  }
  UpdateCliente(templateMensaje: TemplateRef<any>) {
    if (this.LblDescripcionEdit == undefined || this.LblDescripcionEdit == '') {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = 'No fue posible actualizar los datos, por favor valide los datos ingresados.';
    } else {
      const update = {
        Id_Cliente: this.IdClienteEditcliente,
        Descripcion: this.LblDescripcionEdit
      }
      this.Servicios.actualizacliente('2', update).subscribe(respu => {
        if (respu == 'Cliente actualizado exitosamente.') {
          this.modalEditarcliente.hide();
          this.modalMensaje = this._modalService.show(templateMensaje);
          this.lblModalMsaje = respu;

          this.LimpiarClientes();
        } else {
          this.modalMensaje = this._modalService.show(templateMensaje);
          this.lblModalMsaje = 'No fue posible actualizar los datos, por favor valide los datos ingresados.';
        }
      })
    }
  }



  //Verdetalles con grilla dinamica
  GrillaDinamica(templateMensaje: TemplateRef<any>, Array: any) {
    this.IdClienteGrillaDinamica = Array.Id_Cliente;
    this.IdProyectoGrillaDinamica = Array.Id_PRY;
    this.LimpiarClientes();

    this.ArrayGrilla = [];
    this.Servicios.consgrilaproyectbck(this.IdProyectoGrillaDinamica).subscribe(respu => {
      if (respu.length > 0) {
        this.AuxiliarTablaDinamica = true;

        this.NomCliente = respu[0].Cliente;
        this.NomProyecto = respu[0].NombreProyecto;
        this.ArrayGrilla = respu;
      } else {
        this.AuxiliarTablaDinamica = false;
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = 'No cuenta con backups asociados.';
      }
    })
  }
}
