import { Component, OnInit, TemplateRef } from '@angular/core';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pgtipobackup',
  templateUrl: './pgtipobackup.component.html',
  styleUrls: ['./pgtipobackup.component.css'],
})
export class PgtipobackupComponent implements OnInit {
  //Variables consulta tipo backups
  ArrayGrilla: any;

  //variables filtro descripciones
  lblDescripcion: string;

  constructor(
    private _modalService: BsModalService,
    private Servicios: MetodosGlobalesService,
    private modalServiceDos: NgbModal,
    private cookies: CookieService
  ) {}

  ngOnInit(): void {
       this.consultaTipoBackup(this.lblDescripcion);
  }

  consultaTipoBackup(Descripcion: string) {
    if (Descripcion == undefined || Descripcion == '') {
      Descripcion = '0';
    }
    const consulta = {
      IdTipoBackup: 0,
      Descripcion: Descripcion
    };
    this.Servicios.consultatipobck(consulta).subscribe(respu => {
      console.log(consulta);

        this.ArrayGrilla = respu;

    });
  }
}
