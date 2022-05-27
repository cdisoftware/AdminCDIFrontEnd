import { Component, OnInit, TemplateRef } from '@angular/core';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from "ngx-cookie-service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-pg-asigna-roles',
  templateUrl: './pg-asigna-roles.component.html',
  styleUrls: ['./pg-asigna-roles.component.css']
})
export class PgAsignaRolesComponent implements OnInit {

  constructor(private modalService: BsModalService,
    private Servicios: MetodosGlobalesService,
    private modalServiceDos: NgbModal,
    private cookies: CookieService) { }

  //Modal mensaje
  modalMensaje: BsModalRef;
  lblModalMsaje: string;

  //Usuario
  IdUsuarioCookies: string = this.cookies.get('IdUsuario');
  IdRolCookies: string = this.cookies.get('IdRol');


  //NUEVO USUARIO
  NuevoUsuario: boolean = false;

  //EDITA USUARIO
  EditaUsuario: boolean = false;

  //Estado
  Estado: string = '0';

  //Consulta nombre usuario
  NombreUsuario: string;

  ngOnInit(): void {
    this.ListaRoles();
    console.log(this.IdRolCookies)
  }

  NuevoCliente() {
    this.NuevoUsuario = true;
  }
  CancelaNuevoCliente() {
    this.NuevoUsuario = false;
  }

  ArrRoles: any = [];
  ArrRolAsigna: any = [];
  IdRol: string = '0';
  ListaRoles() {
    this.ArrRoles = [];
    this.Servicios.conslistrol('1').subscribe(respu => {
      this.ArrRoles = respu;
      this.ArrRolAsigna = respu;
    })
  }

  ArrBuscaCliente: any = [];
  BuscaCliente(Estado: string, IdRol: string, NombreUsuario: string) {
    var NombreUsu: string;
    if (NombreUsuario == undefined || NombreUsuario == '') {
      NombreUsu = '0';
    } else {
      NombreUsu = NombreUsuario;
    }
    this.Servicios.conscusuario('1', this.IdUsuarioCookies, Estado, IdRol, '0', NombreUsu).subscribe(respu => {
      this.ArrBuscaCliente = respu;
    })
  }
  CancelaBusquedaCliente() {
    this.ArrBuscaCliente = [];
    this.NombreUsuario = '';
    this.IdRol = '0';
    this.Estado = '0';
  }


  ArrSeleccioneClientes: any = [];
  SeleccionaUsuario(Arr: any) {
    this.ArrSeleccioneClientes = Arr;
    console.log(this.ArrSeleccioneClientes)
    this.CancelaBusquedaCliente();
    this.EditaUsuario = true;
    this.ListaAsignaRol();
  }
  IdRolAsigna: string = '0';
  IngresaRol(templateMensaje: TemplateRef<any>) {
    if (this.IdRolAsigna == '0') {
      this.modalMensaje = this.modalService.show(templateMensaje);
      this.lblModalMsaje = 'Operacion no permitida';
    } else {
      const BodyInsert = {
        IdRol: this.IdRolAsigna,
        Estado: 1
      }
      this.Servicios.insertauserolmodifica('3', this.ArrSeleccioneClientes.IdUsuarioC, this.IdUsuarioCookies, BodyInsert).subscribe(Resultado => {
        this.modalMensaje = this.modalService.show(templateMensaje);
      this.lblModalMsaje = Resultado;
        this.ListaAsignaRol();
      })
    }
  }

  ArrListaRolesAsignados: any = [];
  ListaAsignaRol() {
    this.Servicios.conscusuario('2', '0', '0', '0', this.ArrSeleccioneClientes.IdUsuarioC, '0').subscribe(respu => {
      this.ArrListaRolesAsignados = respu;
    })
  }


  EliminaRol(IdUsuario: string, IdRol: string, templateMensaje: TemplateRef<any>) {

    const BodyInsert = {
      IdRol: IdRol,
      Estado: 1
    }
    this.Servicios.insertauserolmodifica('2', IdUsuario, this.IdUsuarioCookies, BodyInsert).subscribe(Resultado => {
      this.modalMensaje = this.modalService.show(templateMensaje);
      this.lblModalMsaje = Resultado;
      this.ListaAsignaRol();
    })

  }

  Guardar(templateMensaje: TemplateRef<any>){
    this.EditaUsuario = false;
    this.modalMensaje = this.modalService.show(templateMensaje);
      this.lblModalMsaje = 'Datos Guardados.';
  }
}
