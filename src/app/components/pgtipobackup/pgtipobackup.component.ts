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

  //Variables ediatr tipo backup
  modalEditarTipoBackup: BsModalRef;
  idTipoBackupEditar: string;
  lblDescripcionEditar: string;

  //Variables Agregar tipo backup
  modalAgregarTipoBackup: BsModalRef;
  lblDescripcionAgregar: string;

  //variables modal mensajes
  lblModalMsaje: string;
  modalMensaje: BsModalRef;


  constructor(
    private _modalService: BsModalService,
    private Servicios: MetodosGlobalesService,
    private modalServiceDos: NgbModal,
    private cookies: CookieService
  ) { }

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
    this.ArrayGrilla = [];
    this.Servicios.consultatipobck(consulta).subscribe(respu => {
      this.ArrayGrilla = respu;
    });
  }
  //editar tipo backup
  editarTipoBackup(templateEditarTipoBackup: TemplateRef<any>, ArGrilla: any) {
    this.modalEditarTipoBackup = this._modalService.show(templateEditarTipoBackup);
    this.idTipoBackupEditar = ArGrilla.Id_Tipo_BCK;
    this.lblDescripcionEditar = ArGrilla.Descripcion;
  }

  UpdateTipoBck(templateMensaje: TemplateRef<any>) {
    if (this.lblDescripcionEditar == '' || this.lblDescripcionEditar == undefined) {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = "Por favor complete los campos a agregar";
    } else {
      const update = {
        Id_Tipo_BCK: this.idTipoBackupEditar,
        Descripcion: this.lblDescripcionEditar
      }

      this.Servicios.actualizatipobackup('2', update).subscribe(respu => {

        if (respu == 'Tipo_Backup actualizado exitosamente.') {
          this.modalMensaje = this._modalService.show(templateMensaje);
          this.lblModalMsaje = respu;
          this.modalEditarTipoBackup.hide();
          this.limpiar();
        }
      });
    }

  }

  //agregar tipo backup
  agregarTipoBackup(templateAgregar: TemplateRef<any>) {
    this.modalAgregarTipoBackup = this._modalService.show(templateAgregar);
  }

  //GUARDAR TIPO BACKUP
  guardarTipoBackup(templateMensaje: TemplateRef<any>) {
    const insert = {
      Descripcion: this.lblDescripcionAgregar
    }
    if (this.lblDescripcionAgregar == undefined || this.lblDescripcionAgregar == '') {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = "Por favor ingrese una descripcion";
    } else {
      this.Servicios.insertatipobackup('3', insert).subscribe(respu => {
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = respu;
        this.modalAgregarTipoBackup.hide();
        this.limpiar();
      });
    }

  }
  limpiar() {
    this.lblDescripcion = '';
    this.consultaTipoBackup(this.lblDescripcion);
  }

  //Borrar
  BorrarTb(templateMensaje: TemplateRef<any>, Array: any) {
    console.log(Array)
    const deletetb =
    {
      Id_Tipo_BCK: Array.Id_Tipo_BCK,
      Descripcion: Array.Descripcion
    }
    this.Servicios.eliminatipobck('4', deletetb).subscribe(respu => {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = respu;
    })
  }
}
