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
  selector: 'app-pgroles',
  templateUrl: './pgroles.component.html',
  styleUrls: ['./pgroles.component.css']
})
export class PgrolesComponent implements OnInit {
  //Usuario
  IdUsuarioCookies: string = this.cookies.get('IdUsuario');

  modalMensaje: BsModalRef;
  lblModalMsaje: string;

  constructor(private modalService: BsModalService,
    private Servicios: MetodosGlobalesService,
    private modalServiceDos: NgbModal,
    private cookies: CookieService) { }

  //Estado rol
  EstadoRol: boolean;
  //Ver resultados
  VerResult: boolean = false;

  ngOnInit(): void {
    this.ListaRoles();
  }

  //Nuevo Rol
  NombreRol: string;
  modalNuevoRol: BsModalRef;
  AbrirPopap(templateAgregarRol: TemplateRef<any>) {
    this.modalNuevoRol = this.modalService.show(templateAgregarRol)
  }
  NuevoRol(templateMensaje: TemplateRef<any>) {
    if (this.NombreRol == '' || this.NombreRol == undefined) {
      this.modalMensaje = this.modalService.show(templateMensaje);
      this.lblModalMsaje = 'Por favor complete los campos a agregar';
    } else {
      const Insert = {
        "NombreRol": this.NombreRol,
        "Estado": 1,
        "IdRol": 0
      }
      this.Servicios.insertacrolmod('3', '0', Insert).subscribe(respu => {
        if (respu == 'El registro ha sido adicionado correctamente.') {
          this.modalNuevoRol.hide();
          this.modalMensaje = this.modalService.show(templateMensaje);
          this.lblModalMsaje = 'El registro ha sido adicionado correctamente.';
          this.ListaRoles();
        }
        if (respu == 'El nombre del rol ya existe, valide la información.') {
          this.modalNuevoRol.hide();
          this.modalMensaje = this.modalService.show(templateMensaje);
          this.lblModalMsaje = 'El nombre del rol ya existe, valide la información.';
          this.ListaRoles();
        }
        this.NombreRol = '';
      })
    }
  }




  ArrRoles: any = [];
  IdRol: string = '0';
  ListaRoles() {
    this.ArrRoles = [];
    this.Servicios.conslistrol('1').subscribe(respu => {
      this.ArrRoles = respu;
    })
  }

  ArrPermisoRol: any = [];
  Rol: string;
  ArrRol: any = [];
  ListaPermisosRol(Arr: string) {
    this.ArrRol = [];
    var Arreglo = [] = Arr.split(",");
    if (Arreglo[2] == '2') {
      this.EstadoRol = false;
    } else if (Arreglo[2] == '1') {
      this.EstadoRol = true;
    }
    var IdRol = Arreglo[0];
    this.Rol = Arreglo[1];
    if (this.IdRol != '0') {
      this.VerResult = true;
      if (IdRol != '0' || IdRol != undefined) {
        this.Servicios.conspermisosrol('1', IdRol, '0').subscribe(respu => {
          var Arr: any = [];
          var NombreModuloPadre: any = [];
          for (var i = 0; i < respu.length; i++) {
            var Num = respu[i].Padre;
            var NombrePadre = respu[i].ModuloPadre;
            if (!NombreModuloPadre.includes(respu[i].ModuloPadre)) {
              NombreModuloPadre.push({ NombrePadre: NombrePadre, EstadoPermiso: respu[i].EstadoPermiso })
            }
            if (!Arr.includes(respu[i].Padre)) {
              Arr.push(Num)
            }
          }
          for (var j = 0; j < Arr.length; j++) {
            this.ArrRol.push({ Padre: Arr[j], ModuloPadre: NombreModuloPadre[j].NombrePadre, EstadoPermiso: NombreModuloPadre[j].EstadoPermiso })
          }
          this.ArrPermisoRol = [];
          this.ArrPermisoRol = respu;
        })
      } else {
        this.ArrPermisoRol = [];
      }
    } else {
      this.VerResult = false;
      this.ArrPermisoRol = [];
      this.ArrRol = [];
    }
  }

  EditaRol(Estado: string, templateMensaje: TemplateRef<any>) {
    var Arreglo = [] = this.IdRol.split(",");
    const Update = {
      NombreRol: this.Rol,
      Estado: Estado,
      IdRol: Arreglo[0]
    }
    this.Servicios.actualizacrolmod('2', this.IdUsuarioCookies, Update).subscribe(respu => {
      this.modalMensaje = this.modalService.show(templateMensaje);
      this.lblModalMsaje = respu;
      if (respu == 'El registro ha sido actualizado correctamente.') {
        this.EstadoRol = true;
      } else {
        this.EstadoRol = false;
      }
    })
  }


  ModificaRol(Arr: any, Id: any, templateMensaje: TemplateRef<any>) {
    var Estado: string;
    var elementCheked = <HTMLInputElement>document.getElementById(Id);
    if (elementCheked.checked == true) {
      Estado = "1";
    } else {
      Estado = "2";
    }
    const Update = {
      IdModulo: Arr.IdModulo,
      IdRol: Arr.IdRol,
      Estado: Estado
    }
    this.Servicios.actualizacpermisorol('2', this.IdUsuarioCookies, Update).subscribe(respu => {
      this.modalMensaje = this.modalService.show(templateMensaje);
      this.lblModalMsaje = respu;
      this.ListaPermisosRol(this.IdRol);
    })
  }

  SeleccionaTodo(Arr: any, Id: any) {
    var elementCheked = <HTMLInputElement>document.getElementById(Id);
    if (elementCheked.checked == true) {
      //Si
      console.log('SI')
    } else {
      //No
      console.log('NO')
    }
    var Arreglo = [] = this.IdRol.split(",");
    var IdRol = Arreglo[0];
    this.Servicios.consrolmodulo(IdRol, Arr.ModuloPadre).subscribe(respu => {
    })
  }
}
