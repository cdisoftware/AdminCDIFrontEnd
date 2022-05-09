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
    console.log('Pasa')
    this.ListaRoles();
  }

  ArrRoles: any = [];
  ListaRoles() {
    this.Servicios.conslistrol('1').subscribe(respu => {
      console.log(respu)
      this.ArrRoles = [];
      this.ArrRoles = respu;
    })
  }
}
