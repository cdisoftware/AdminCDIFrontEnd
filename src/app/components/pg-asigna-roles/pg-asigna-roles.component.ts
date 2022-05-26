import { Component, OnInit, TemplateRef } from '@angular/core';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from "ngx-cookie-service";

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

  //Usuario
  IdUsuarioCookies: string = this.cookies.get('IdUsuario');

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
  }

  NuevoCliente() {
    this.NuevoUsuario = true;
  }
  CancelaNuevoCliente() {
    this.NuevoUsuario = false;
  }

  ArrRoles: any = [];
  IdRol: string = '0';
  ListaRoles() {
    this.ArrRoles = [];
    this.Servicios.conslistrol('1').subscribe(respu => {
      this.ArrRoles = respu;
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
  }
}
