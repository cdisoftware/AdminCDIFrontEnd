import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';

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

  //variables filtros
  ipPublic: string;

  //Variable lista Tipo Publicacion
  selectTipo: string;
  LblIP: string;
  SelectEstado: string;
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
    console.log(BodyPublic)
    this.Servicios.consAdminPublic('1', TipoPublicacion, Estado, BodyPublic).subscribe(respu => {
      console.log(respu)
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
}


