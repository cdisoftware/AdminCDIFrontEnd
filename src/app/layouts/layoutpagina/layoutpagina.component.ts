import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-layoutpagina',
  templateUrl: './layoutpagina.component.html',
  styleUrls: ['./layoutpagina.component.css'],
})
export class LayoutpaginaComponent implements OnInit {
  //Usuario
  IdUsuarioCookies: string = this.cookies.get('IdUsuario');

  //Variables globales
  lblModalMsaje: string;
  modalMensaje: BsModalRef;
  AuxiliarDiv: boolean;


  //Variables TipoServidor
  ArregloGrillaTipoServidor: any;
  LblDescripcion: string;
  //Editar
  modalEditarTipoServidor: BsModalRef;
  LblDescripcionEdit: string;
  IdTipoServidor: string;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private modalService: BsModalService,
    public router: Router,
    private cookies: CookieService,
    private modalServiceDos: NgbModal,
    private Servicios: MetodosGlobalesService) { }
  //Variables nombre
  NombreUsu: string = this.cookies.get('Nombre');
  //Variables admin
  AminUser: string = this.cookies.get('UserAdmin');

  ngOnInit(): void {
    this.Obtienedata();
  }

  //Arreglo MENU
  MenuPri: any = [];
  SubMenu: any = [];
  Obtienedata() {
    if (this.cookies.get('IdUsuario') == undefined || this.cookies.get('IdUsuario') == '' || this.cookies.get('IdUsuario') == null) {
      this.Cerrar();
      window.alert("Operacion no permitida");
    } else {
      this.Servicios.consusuarioroles('1', this.IdUsuarioCookies).subscribe(respu => {
        this.SubMenu = respu;
        if (respu.length > 0) {
          var MenuprincipalCompara: any = [];
          this.MenuPri = [];
          for (var i = 0; i < respu.length; i++) {
            if (!MenuprincipalCompara.includes(respu[i].NombrePadre)) {
              MenuprincipalCompara.push(respu[i].NombrePadre);
              this.MenuPri.push({ Menu: respu[i].NombrePadre, IdMenu: respu[i].Padre });
            }
          }
        } else {
          this.Cerrar();
          window.alert("El usuario no tiene roles asignados por favor comuníquese con el administrador para este le suministré uno.");
        }
      });
    }
  }

  Cerrar() {
    this.router.navigate(['']);
    this.cookies.set('Nombre', '');
    this.cookies.set('Apellido', '');
    this.cookies.set('IdUsuario', '');
    this.cookies.set("UserAdmin", '');
    this.cookies.set("Usuario", '');
    this.cookies.set("Password", '');
    this.cookies.set("IdRol", '');
  }
  VerHome() {
    this.router.navigate(['home']);
  }
  VerPgUsuario() {
    this.router.navigate(['home/PgUsuario']);
  }
  VerPgServicios(Id: string) {
    this.router.navigate(['home/PgServicios/' + Id]);
  }
  IrPag(Pagina: string, templateMensaje: TemplateRef<any>) {
    if (Pagina == '' || Pagina == undefined) {
      this.modalMensaje = this.modalService.show(templateMensaje);
      this.lblModalMsaje = 'Estamos trabajando para brindarte una mejor experiencia.';
    } else {
      this.router.navigate(['home/' + Pagina + '']);
    }
  }
}