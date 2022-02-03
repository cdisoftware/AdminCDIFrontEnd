import { Component, OnInit, TemplateRef } from '@angular/core';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Workbook } from "exceljs";
import { saveAs } from 'file-saver';
import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pghardware',
  templateUrl: './pghardware.component.html',
  styleUrls: ['./pghardware.component.css']
})
export class PghardwareComponent implements OnInit {
  //Variables consulta hardware
  ArrayConsulta: any;
  IdServidor: string;

  constructor(private _modalService: BsModalService,
    private Servicios: MetodosGlobalesService,
    private modalServiceDos: NgbModal,
    private cookies: CookieService
  ) { }

  ngOnInit(): void {
    this.ConsultaHardware(this.IdServidor);
  }

  //Consulta
  ConsultaHardware(IdSer: string){
    if (IdSer == undefined || IdSer == '') {
      IdSer = '0';
    }
    this.ArrayConsulta = [];
    this.Servicios.consultahardware(IdSer,'0','0','0').subscribe(respu => {
      if (respu.length > 0) {
        this.ArrayConsulta = respu;
      }
    })
  }
}
