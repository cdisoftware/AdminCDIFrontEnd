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

   constructor(private _modalService: BsModalService,
    private Servicios: MetodosGlobalesService,
    private modalServiceDos: NgbModal
  ) { }

  ngOnInit(): void {
    this.Grilla();
  }

    //Grilla
    Grilla() {
      this.ArregloGrilla = [];
      this.AuxiliadorGrilla = false;
      this.Servicios.consultaservidors('1', '0', '0', '2', '0').subscribe(respu => {
        console.log(respu)
        if (respu.length > 0) {
          this.ArregloGrilla = respu;
          this.AuxiliadorGrilla = true;
        }
      })
    }
}
