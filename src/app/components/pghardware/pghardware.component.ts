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
  IdServidorConsult: string;
  LblProcesador: string;
  LblDiscoDuro: string;
  LblRam: string;

  //Lista servidor
  ArregloListaServidor: any;

  //Variables modal mensaje
  lblModalMsaje: string;
  modalMensaje: BsModalRef;

  //Variables modal agregar
  modalAgregar: BsModalRef;

  constructor(private _modalService: BsModalService,
    private Servicios: MetodosGlobalesService,
    private modalServiceDos: NgbModal,
    private cookies: CookieService
  ) { }

  ngOnInit(): void {
    //Inizializa bariables consulta
    this.IdServidorConsult = '0';

    this.ConsultaHardware(this.IdServidorConsult, this.LblProcesador, this.LblDiscoDuro, this.LblRam);
    this.ListaTipoServidor();
  }

  //Limpiar
  Limpiar(){
    this.IdServidorConsult = '0';
    this.LblProcesador = '';
    this.LblDiscoDuro = '';
    this.LblRam = '';

    this.ConsultaHardware(this.IdServidorConsult, this.LblProcesador, this.LblDiscoDuro, this.LblRam);
  }

  //Consulta
  ConsultaHardware(IdSer: string, Procesador: string, DiscoDuro: string, Ram: string) {
    if (IdSer == undefined || IdSer == '') {
      IdSer = '0';
    }
    if (Procesador == undefined || Procesador == '') {
      Procesador = '0';
    }
    if (DiscoDuro == undefined || DiscoDuro == '') {
      DiscoDuro = '0';
    }
    if (Ram == undefined || Ram == '') {
      Ram = '0';
    }
    this.ArrayConsulta = [];
    this.Servicios.consultahardware(IdSer, DiscoDuro, Ram, Procesador).subscribe(respu => {
      if (respu.length > 0) {
        this.ArrayConsulta = respu;
      }
    })
  }
  ListaTipoServidor() {
    this.ArregloListaServidor = [];
    this.Servicios.consultaservidors('1','0','0','2','0').subscribe(respu => {
      if (respu.length > 0) {
        this.ArregloListaServidor = respu;
      }
    })
  }

  //Popap agregar
  BtnNuevo(templateAgregar: TemplateRef<any>) {
    this.modalAgregar = this._modalService.show(templateAgregar)
  }
}
