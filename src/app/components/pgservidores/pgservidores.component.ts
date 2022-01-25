import { Component, OnInit } from '@angular/core';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Workbook } from "exceljs";
import { saveAs } from 'file-saver';
import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pgservidores',
  templateUrl: './pgservidores.component.html',
  styleUrls: ['./pgservidores.component.css']
})
export class PgservidoresComponent implements OnInit {
  //Variables grilla
  ArregloGrilla: any;
  AuxiliadorGrilla: boolean;

  //Variables nombre servidor
  lblNombreservidor: string;

  //Variables SO
  lblSO: string;

  //Variables Estado
  IdEstado: string;

  //Variables lista usuario
  ArregloListaUsuario: any[];

  //Variables Usuario
  IdUsuario: string;

  constructor(private _modalService: BsModalService,
    private Servicios: MetodosGlobalesService,
    private modalServiceDos: NgbModal
  ) { }

  ngOnInit(): void {
    this.IdEstado = '2';
    this.IdUsuario = '0';
    this.lblNombreservidor = '';
    this.lblSO = '';


    this.Grilla(this.lblNombreservidor, this.lblSO, this.IdEstado, this.IdUsuario);
    this.ListaUsuario();
  }

  Limpiar(){
    this.IdEstado = '2';
    this.IdUsuario = '0';
    this.lblNombreservidor = '';
    this.lblSO = '';
    this.Grilla(this.lblNombreservidor, this.lblSO, this.IdEstado, this.IdUsuario);
  }
  //Grilla
  Grilla(NombreServidor: string, SO: string, IdEstado: string, IdUsuario: string) {
    if (NombreServidor == undefined || NombreServidor == '') {
      NombreServidor = '0';
    }
    if (SO == undefined || SO == '') {
      SO = '0';
    }
    this.ArregloGrilla = [];
    this.AuxiliadorGrilla = false;
    this.Servicios.consultaservidors('1', NombreServidor, SO, IdEstado, IdUsuario).subscribe(respu => {
      if (respu.length > 0) {
        this.ArregloGrilla = respu;
        this.AuxiliadorGrilla = true;
      }
    })
  }

  ListaUsuario(){
    const ConsultaUsu =
    {
      Nombre: "0",
      Apellido: "0",
      Cedula: "0"
    }
    this.ArregloListaUsuario = [];
    this.Servicios.consultausuarios(ConsultaUsu).subscribe(respu => {
      this.ArregloListaUsuario = respu;
    })
  }
}
