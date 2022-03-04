import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pgservicios',
  templateUrl: './pgservicios.component.html',
  styleUrls: ['./pgservicios.component.css']
})
export class PgserviciosComponent implements OnInit {
  //Variables modal mensaje
  modalMensaje: BsModalRef;
  //Variables inicio de paguina
  NombreProyecto: string;
  //Variables consulta proyecto
  ArrayGrilla: any;
  IdProyecto: string;
  //Variables iniciacion agregar
  IdInicioListas: string = '0';

  //Variables filtros
  Tiposervidor: string;
  Prioridad: string;
  Sp: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private Servicios: MetodosGlobalesService,
    private _modalService: BsModalService
  ) { }

  ngOnInit(): void {
    let Id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.IdProyecto = '';
    this.IdProyecto += Id;

    this.Grilla(this.Tiposervidor, this.Prioridad, this.Sp);
  }

  Grilla(TipoServicio: string, Prioridad: string, Sp: string) {
    if (TipoServicio == undefined || TipoServicio == '') {
      TipoServicio = '0';
    }
    if (Prioridad == undefined || Prioridad == '') {
      Prioridad = '0';
    }
    if (Sp == undefined || Sp == '') {
      Sp = '0';
    }
    this.ArrayGrilla = [];
    this.Servicios.consultservicios(this.IdProyecto, TipoServicio, Prioridad, Sp).subscribe(respu => {
      console.log(respu)
      if (respu.length > 0) {
        this.NombreProyecto = respu[0].NombreProyecto
        this.ArrayGrilla = respu;
      }
    })
  }






















  BtnInfo(templateMensaje: TemplateRef<any>) {
    this.modalMensaje = this._modalService.show(templateMensaje)
  }

}
