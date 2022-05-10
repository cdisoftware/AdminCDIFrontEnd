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

  constructor(private modalService: BsModalService,
    private Servicios: MetodosGlobalesService,
    private modalServiceDos: NgbModal,
    private cookies: CookieService) { }

  ngOnInit(): void {
    this.ListaRoles();
  }

  //Nuevo Rol
  modalNuevoRol: BsModalRef;
  AbrirPopap(templateAgregarRol: TemplateRef<any>) {
    this.modalNuevoRol = this.modalService.show(templateAgregarRol)
  }
  NuevoRol(){
    const Insert = {

    }
    this.Servicios.insertacrolmod('3', '1', Insert).subscribe(respu => {
      console.log(respu)
    })
  }




  ArrRoles: any = [];
  IdRol: string = '0';
  ListaRoles() {
    this.Servicios.conslistrol('1').subscribe(respu => {
      this.ArrRoles = [];
      this.ArrRoles = respu;
    })
  }

  ArrPermisoRol: any = [];
  ListaPermisosRol(IdRol: string) {
    if (IdRol != '0' || IdRol != undefined) {
      this.Servicios.conspermisosrol('1', IdRol, '0').subscribe(respu => {
        console.log(respu)
        this.ArrPermisoRol = [];
        this.ArrPermisoRol = respu;
      })
    } else {
      this.ArrPermisoRol = [];
    }
  }
}
