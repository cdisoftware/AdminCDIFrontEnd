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

  //Variables consulta
  ArrayConsultaProyecto: any;
  LblNombre: string;
  IdCliente: string;

  ngOnInit(): void {
    this.consultaproyectos(this.LblNombre, this.IdCliente);
  }

  consultaproyectos(Nombre: string, IdCliente: string){
    if (Nombre == undefined || Nombre == '') {
      Nombre = '0';
    }
    if (IdCliente == undefined || IdCliente == '') {
      IdCliente = '0';
    }
    this.ArrayConsultaProyecto = [];
    this.Servicios.consultaproyect('1', '0', '0').subscribe(respu => {
      if (respu.length > 0) {
        this.ArrayConsultaProyecto = respu;
        console.log(respu)
      }
    })
  }
}
