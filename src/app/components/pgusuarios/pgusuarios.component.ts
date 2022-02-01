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

  //Variables editar
  modalEditar: BsModalRef;
  IdEditIdentificador: string;
  LblEditNombre: string;
  LblEditApellido: string;
  LblEditUsuario: string;
  LblEditPasword: string;
  LblEditCedula: string;

  constructor(private _modalService: BsModalService,
    private Servicios: MetodosGlobalesService,
    private modalServiceDos: NgbModal,
    private cookies: CookieService
  ) { }

  ngOnInit(): void {
    this.ListaUsuario(this.LblNombre, this.LblApellido, this.LblCedula);
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

    //Limpiar campos editar
    this.IdEditIdentificador = '';
    this.LblEditNombre = '';
    this.LblEditApellido = '';
    this.LblEditUsuario = '';
    this.LblEditPasword = '';
    this.LblEditCedula = '';

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
      this.LblAgregarCedula == undefined || this.LblAgregarCedula == '') {

      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = "Por favor complete los campos a agregar";
    } else {
      const datosinsert =
      {
        Nombre: this.LblAgregarNombre,
        Apellido: this.LblAgregarApellido,
        Usuario: this.LblAgregarUsuario,
        Password: this.LblAgregarPasword,
        Cedula: this.LblAgregarCedula
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
  }
  Update(templateMensaje: TemplateRef<any>) {
    const datosupdate = {
      Id_U: this.IdEditIdentificador,
      Nombre: this.LblEditNombre,
      Apellido: this.LblEditApellido,
      Usuario: this.LblEditUsuario,
      Password: this.LblEditPasword,
      Cedula: this.LblEditCedula
    }
    this.Servicios.actualizausuario('2', datosupdate).subscribe(respu => {
      if (respu.length > 0) {
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = respu;

        this.modalEditar.hide();
        this.Limpiar();
      }
    })
  }
}
