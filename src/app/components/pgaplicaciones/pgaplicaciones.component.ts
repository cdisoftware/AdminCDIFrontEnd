import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { Workbook } from "exceljs";
import { saveAs } from 'file-saver';
import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf';
@Component({
  selector: 'app-pgaplicaciones',
  templateUrl: './pgaplicaciones.component.html',
  styleUrls: ['./pgaplicaciones.component.css']
})
export class PgaplicacionesComponent implements OnInit {

  modalAgregar: BsModalRef;
  modalEditar: BsModalRef;
  modalMensaje: BsModalRef;
  lblModalMsaje: string;

  //Variables grilla
  ArregloGrillaPublic: any;
  AuxiliadorGrilla: boolean;
 
  //Variable lista Tipo Publicacion
  selectTipo: string = '0';
  LblIP: string = '0';
  SelectEstado: string = '0';
  ArregloListaTipo: any;

  //Variables agregar
  AddTipo: string;
  AddLblIp: string;
  AddLblNombre: string;
  AddLblDescripcion: string;
  AddEstado: string;
  AddAmbiente: string;

  //Variables editar
  IdPublic: string;
  EditTipo: string;
  EditLblIp: string;
  EditLblNombre: string;
  EditLblDescripcion: string;
  EditEstado: string;
  EditAmbiente: string;

  //Variable lista IP SERVIDOR
  ArregloListaServidor: any;

  //Variables Fecha
  Dia = new Date().getDate();
  Mes = new Date().getMonth() + 1;
  Año = new Date().getFullYear();

  Fecha: string = this.Año + '-' + this.Mes + '-' + this.Dia;
  constructor(private _modalService: BsModalService,
    private Servicios: MetodosGlobalesService) { }

  ngOnInit(): void {
    this.Grilla(this.selectTipo, this.LblIP, this.SelectEstado);
    this.selectTipo = '0';
    this.LblIP = '';
    this.SelectEstado = '0';

    this.AddTipo = '0';
    this.AddEstado = '0';
    this.AddAmbiente = '0';
    this.ListaServidor();
  }

  //Popap agregar
  BtnAgregar(templateAgregar: TemplateRef<any>) {
    this.modalAgregar = this._modalService.show(templateAgregar);
    this.modalAgregar.setClass('modal-lg');
  }

  //Editar Servidor
  BtnEditar(templateEditar: TemplateRef<any>, Array: any) {
    this.modalEditar = this._modalService.show(templateEditar);
    this.modalEditar.setClass('modal-lg');
    this.IdPublic = Array.Id;
    this.EditTipo = Array.IdTipoPublicacion;
    this.EditLblIp = Array.IpPublicacion;
    this.EditLblNombre = Array.Nombre;
    this.EditLblDescripcion = Array.Descripcion;
    this.EditEstado = Array.Estado;
    this.EditAmbiente = Array.Ambiente;
  }

  //Grilla
  Grilla(TipoPublicacion: string, IpPublicacion: string, Estado: string) {

    if (TipoPublicacion == undefined || TipoPublicacion == '') {
      TipoPublicacion = '0';
    }
    if (IpPublicacion == undefined || IpPublicacion == '') {
      IpPublicacion = '0';
    }
    if (Estado == undefined || Estado == '') {
      Estado = '0';
    }

    this.ArregloGrillaPublic = [];
    this.AuxiliadorGrilla = false;

    const BodyPublic = {
      IpPublicacion: IpPublicacion
    }
    this.Servicios.consAdminPublic('1', TipoPublicacion, Estado, BodyPublic).subscribe(respu => {
      if (respu.length > 0) {
        this.ArregloGrillaPublic = respu;
        this.AuxiliadorGrilla = true;
      }
    })
  }

  LimpiarFiltros() {
    this.selectTipo = '0';
    this.LblIP = '';
    this.SelectEstado = '0';
    this.Grilla(this.selectTipo, this.LblIP, this.SelectEstado);
  }

  AgregarAdminPublic(templateMensaje: TemplateRef<any>) {
    if (this.AddTipo == undefined || this.AddTipo == '0' || this.AddTipo == undefined ||
      this.AddLblIp == undefined || this.AddLblIp == '' || this.AddLblIp == undefined ||
      this.AddLblNombre == undefined || this.AddLblNombre == '' || this.AddLblNombre == undefined ||
      this.AddLblDescripcion == undefined || this.AddLblDescripcion == '' || this.AddLblDescripcion == undefined ||
      this.AddEstado == undefined || this.AddEstado == '' || this.AddEstado == undefined ||
      this.AddAmbiente == undefined || this.AddAmbiente == '' || this.AddAmbiente == undefined) {

      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = "Complete los campos";
    } else {
      const AddBody =
      {
        IdPublicacion: 0,
        Tipo: this.AddTipo,
        Ip: this.AddLblIp,
        Nombre: this.AddLblNombre,
        Descripcion: this.AddLblDescripcion,
        Estado: this.AddEstado,
        Ambiente: this.AddAmbiente
      }
      console.log(AddBody)

      this.Servicios.ModAdminPublic('3', AddBody).subscribe(respu => {
        if (respu.length > 0) {
          this.modalMensaje = this._modalService.show(templateMensaje);
          this.lblModalMsaje = respu;
          this.Grilla(this.selectTipo, this.LblIP, this.SelectEstado);

          this.modalAgregar.hide();
          this.LimpiarFormAdd();
        }
      })
    }
  }

  LimpiarFormAdd() {
    this.AddTipo = '0';
    this.AddLblIp = '';
    this.AddLblNombre = '';
    this.AddLblDescripcion = '';
    this.AddEstado = '0';
    this.AddAmbiente = '0';
    this.Grilla(this.selectTipo, this.LblIP, this.SelectEstado);

  }

  ListaServidor() {
    this.ArregloListaServidor = [];
    this.Servicios.consultaservidors('1', '0', '0', '2', '0').subscribe(respu => {
      if (respu.length > 0) {
        this.ArregloListaServidor = respu;
      }
    })
  }


  EditarAdminPublic(templateMensaje: TemplateRef<any>) {
    const AddBodyEdit =
    {
      IdPublicacion: this.IdPublic,
      Tipo: this.EditTipo,
      Ip: this.EditLblIp,
      Nombre: this.EditLblNombre,
      Descripcion: this.EditLblDescripcion,
      Estado: this.EditEstado,
      Ambiente: this.EditAmbiente
    }
    console.log(AddBodyEdit)
    this.Servicios.ModAdminPublic('2', AddBodyEdit).subscribe(respu => {
      console.log(respu)
      if (respu.length > 0) {
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = respu;
        this.Grilla(this.selectTipo, this.LblIP, this.SelectEstado);
        this.modalEditar.hide();
      }
    })
  }

  EliminarAdminPublic(templateMensaje: TemplateRef<any>, Arr: any) {
    const AddBodyEdit =
    {
      IdPublicacion: Arr.Id,
      Tipo: Arr.IdTipoPublicacion,
      Ip: Arr.IpPublicacion,
      Nombre: Arr.Nombre,
      Descripcion: Arr.Descripcion,
      Estado: Arr.Estado,
      Ambiente: Arr.Ambiente
    }
    this.Servicios.ModAdminPublic('4', AddBodyEdit).subscribe(respu => {
      if (respu.length > 0) {
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = respu;
        this.LimpiarFormAdd();
      }
    })
  }
  //Descargar Excel
  BtnExportarExcel(templateMensaje: TemplateRef<any>) {
    if (this.ArregloGrillaPublic.length > 0) {
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet("Registro Admin Publicaciones");
      let header = ["Tipo", "Ip", "Nombre", "Descripción", "Estado", "Ambiente"];
      worksheet.addRow(header);

      for (let x1 of this.ArregloGrillaPublic) {
        let temp = []
        temp.push(x1['Tipo'])
        temp.push(x1['Ip'])
        temp.push(x1['Nombre'])
        temp.push(x1['Descripción'])
        temp.push(x1['Estado'])
        temp.push(x1['Ambiente'])

        worksheet.addRow(temp)
      }

      let fname = "RegistroAdminPublic - " + this.Fecha;

      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, fname + '.xlsx');
      });
    } else {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = 'No existen registros disponibles, por favor seleccione otros filtros';
    }
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
        6: { cellWidth: 108 }
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
        ["Tipo", "Ip", "Nombre", "Descripción", "Estado", "Ambiente"],
      ]
    })

    this.ArregloGrillaPublic.forEach(function (respuesta: any) {

      var Res =
        [respuesta.TipoPubli, respuesta.IpPublicacion, respuesta.Nombre,
        respuesta.Descripcion, respuesta.DescripcionEstado, respuesta.DescripcionAmbiente];

      autoTable(doc, {
        margin: { top: 0, bottom: 0 },
        columnStyles: {
          1: { cellWidth: 108 },
          2: { cellWidth: 108 },
          3: { cellWidth: 108 },
          4: { cellWidth: 108 },
          5: { cellWidth: 108 },
          6: { cellWidth: 108 }
        },
        body:
          [
            Res
          ]
      })
    });

    doc.save('RegistroAdminPublic - ' + this.Fecha + '.pdf')
  }
}


