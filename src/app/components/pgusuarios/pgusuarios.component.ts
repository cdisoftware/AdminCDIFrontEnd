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
  selector: 'app-pgusuarios',
  templateUrl: './pgusuarios.component.html',
  styleUrls: ['./pgusuarios.component.css']
})
export class PgusuariosComponent implements OnInit {
  //Variables globales
  modalMensaje: BsModalRef;
  lblModalMsaje: string;

  //Variables Lista usuarios
  ArregloGrillaUsuario: any;
  LblNombre: string;
  LblApellido: string;
  LblCedula: string;

  //Variables agregar
  modalAgregar: BsModalRef;
  LblAgregarNombre: string;
  LblAgregarApellido: string;
  LblAgregarUsuario: string;
  LblAgregarPasword: string;
  LblAgregarCedula: string;
  LblUserAdmin: string;

  //Variables editar
  modalEditar: BsModalRef;
  IdEditIdentificador: string;
  LblEditNombre: string;
  LblEditApellido: string;
  LblEditUsuario: string;
  LblEditPasword: string;
  LblEditCedula: string;
  LblEditUserAdmin: string;


  //Variables Fecha
  Dia = new Date().getDate();
  Mes = new Date().getMonth() + 1;
  Año = new Date().getFullYear();

  Fecha: string = this.Año + '-' + this.Mes + '-' + this.Dia;

  constructor(private _modalService: BsModalService,
    private Servicios: MetodosGlobalesService,
    private modalServiceDos: NgbModal,
    private cookies: CookieService
  ) { }

  ngOnInit(): void {
    this.ListaUsuario(this.LblNombre, this.LblApellido, this.LblCedula);
    this.LblUserAdmin = '2';
    this.LblEditUserAdmin = '2';
  }

  //Limpiar
  Limpiar() {
    this.LblNombre = '';
    this.LblApellido = '';
    this.LblCedula = '';

    //Limpiar campos agregar
    this.LblAgregarNombre = '';
    this.LblAgregarApellido = '';
    this.LblAgregarUsuario = '';
    this.LblAgregarPasword = '';
    this.LblAgregarCedula = '';
    this.LblUserAdmin = '2';

    //Limpiar campos editar
    this.IdEditIdentificador = '';
    this.LblEditNombre = '';
    this.LblEditApellido = '';
    this.LblEditUsuario = '';
    this.LblEditPasword = '';
    this.LblEditCedula = '';
    this.LblEditUserAdmin = '2';

    this.ListaUsuario(this.LblNombre, this.LblApellido, this.LblCedula);
  }
  //Lista
  ListaUsuario(Nombre: string, Apellido: string, LblCedula: string) {
    if (Nombre == undefined || Nombre == '') {
      Nombre = '0';
    }
    if (Apellido == undefined || Apellido == '') {
      Apellido = '0';
    }
    if (LblCedula == undefined || LblCedula == '') {
      LblCedula = '0';
    }

    const ConsultaU = {
      Nombre: Nombre,
      Apellido: Apellido,
      Cedula: LblCedula
    }
    this.ArregloGrillaUsuario = [];
    this.Servicios.consultausuarios(ConsultaU).subscribe(respu => {
      if (respu.length > 0) {
        this.ArregloGrillaUsuario = respu;
      }
    })
  }
  //Agregar
  BtnNuevo(templateAgregar: TemplateRef<any>) {
    this.modalAgregar = this._modalService.show(templateAgregar);
  }
  AgregarBck(templateMensaje: TemplateRef<any>) {
    if (this.LblAgregarNombre == undefined || this.LblAgregarNombre == '' || this.LblAgregarApellido == undefined || this.LblAgregarApellido == '' ||
      this.LblAgregarUsuario == undefined || this.LblAgregarUsuario == '' || this.LblAgregarPasword == undefined || this.LblAgregarPasword == '' ||
      this.LblAgregarCedula == undefined || this.LblAgregarCedula == '' || this.LblUserAdmin == undefined || this.LblUserAdmin == '0') {

      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = "Por favor complete los campos a agregar";
    } else {
      const datosinsert =
      {
        Nombre: this.LblAgregarNombre,
        Apellido: this.LblAgregarApellido,
        Usuario: this.LblAgregarUsuario,
        Password: this.LblAgregarPasword,
        Cedula: this.LblAgregarCedula,
        UserAdmin: this.LblUserAdmin
      }
      this.Servicios.insertausuario('3', datosinsert).subscribe(respu => {
        if (respu.length > 0) {
          this.modalMensaje = this._modalService.show(templateMensaje);
          this.lblModalMsaje = respu;

          this.modalAgregar.hide();
          this.Limpiar();
        }
      })
    }
  }
  //Editar
  BtnEdit(templateEditar: TemplateRef<any>, ArGrilla: any) {
    this.modalEditar = this._modalService.show(templateEditar);
    this.IdEditIdentificador = ArGrilla.Id_U;
    this.LblEditNombre = ArGrilla.Nombre;
    this.LblEditApellido = ArGrilla.Apellido;
    this.LblEditUsuario = ArGrilla.Usuario;
    this.LblEditPasword = ArGrilla.Password;
    this.LblEditCedula = ArGrilla.Cedula;
    this.LblEditUserAdmin = ArGrilla.UserAdmin;
  }
  Update(templateMensaje: TemplateRef<any>) {
    const datosupdate = {
      Id_U: this.IdEditIdentificador,
      Nombre: this.LblEditNombre,
      Apellido: this.LblEditApellido,
      Usuario: this.LblEditUsuario,
      Password: this.LblEditPasword,
      Cedula: this.LblEditCedula,
      UserAdmin: this.LblEditUserAdmin
    }
    console.log(datosupdate)
    this.Servicios.actualizausuario('2', datosupdate).subscribe(respu => {
      if (respu.length > 0) {
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = respu;

        this.modalEditar.hide();
        this.Limpiar();
      }
    })
  }




  DescargarDatosPdf(templateMensaje: TemplateRef<any>) {
    const doc = new jsPDF('l', 'px', 'a3');

    autoTable(doc, {
      styles: { fillColor: [236, 240, 241] },
      columnStyles: {
        1: { cellWidth: 172.8 },
        2: { cellWidth: 172.8 },
        3: { cellWidth: 172.8 },
        4: { cellWidth: 172.8 },
        5: { cellWidth: 172.8 }
      },
      didParseCell: function (data) {
        var rows = data.table.body;
        if (data.row.index === 0) {
          data.cell.styles.fillColor = [0, 80, 80];
        }
      },
      margin: { top: 10 },
      body: [
        ['Nombre', 'Apellido', 'Usuario', 'Contraseña', 'Cedula'],
      ]
    })

    if (this.ArregloGrillaUsuario.length > 0) {
      this.ArregloGrillaUsuario.forEach(function (respuesta: any) {

        var Res = [respuesta.Nombre, respuesta.Apellido, respuesta.Usuario, respuesta.Password, respuesta.Cedula];

        autoTable(doc, {
          margin: { top: 0, bottom: 0 },
          columnStyles: {
            1: { cellWidth: 172.8 },
            2: { cellWidth: 172.8 },
            3: { cellWidth: 172.8 },
            4: { cellWidth: 172.8 },
            5: { cellWidth: 172.8 }
          },
          body:
            [
              Res
            ]
        })
      });

      doc.save('Registro Usuarios - ' + this.Fecha + '.pdf')
    } else {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = 'No existen registros disponibles, por favor seleccione otros filtros';
    }
  }

  //Descargar Excel
  BtnExportarExcel(Nombre: string, Apellido: string, LblCedula: string, templateMensaje: TemplateRef<any>) {
    if (Nombre == undefined || Nombre == '') {
      Nombre = '0';
    }
    if (Apellido == undefined || Apellido == '') {
      Apellido = '0';
    }
    if (LblCedula == undefined || LblCedula == '') {
      LblCedula = '0';
    }

    const ConsultaU = {
      Nombre: Nombre,
      Apellido: Apellido,
      Cedula: LblCedula
    }
    this.ArregloGrillaUsuario = [];
    this.Servicios.consultausuarios(ConsultaU).subscribe(respu => {
      if (respu.length > 0) {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet("Registro backup");
        let header = ['Nombre', 'Apellido', 'Usuario', 'Contraseña', 'Cedula'];
        worksheet.addRow(header);

        for (let x1 of respu) {
          let temp = []
          temp.push(x1['Nombre'])
          temp.push(x1['Apellido'])
          temp.push(x1['Usuario'])
          temp.push(x1['Password'])
          temp.push(x1['Cedula'])

          worksheet.addRow(temp)
        }

        let fname = "Registro usuarios - " + this.Fecha;

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

  //Eliminar registro
  EliminaRegistro(templateMensaje: TemplateRef<any>, Arr: any) {
    const datosupdate =
    {
      Id_U: Arr.Id_U,
      Nombre: Arr.Nombre
    }
    this.Servicios.eliminausuario('4', datosupdate).subscribe(respu => {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = respu;
      this.Limpiar();
    })
  }
}
