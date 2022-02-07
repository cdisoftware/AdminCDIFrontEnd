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

  //Variables consulta proyecto
  ArrayConsultaProyecto: any;
  LblNombre: string;
  IdCliente: string;
  //Variables lista cliente
  Arraylistacliente: any;
  //Variables consulta cliente
  ArrayConsultaCliente: any;
  LblDescripcion: string;

  ngOnInit(): void {
    this.consultaproyectos(this.LblNombre, this.IdCliente);
    this.IdCliente = '0';
    
    this.consultaclientes(this.LblDescripcion);
    this.listacliente();
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
        console.log(respu)
      }
    })
  }
}
