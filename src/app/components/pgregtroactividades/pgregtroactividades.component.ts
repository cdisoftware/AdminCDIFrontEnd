import { Component, OnInit, TemplateRef } from '@angular/core';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-pgregtroactividades',
  templateUrl: './pgregtroactividades.component.html',
  styleUrls: ['./pgregtroactividades.component.css']
})

export class PgregtroactividadesComponent implements OnInit {

  IdUsuarioCookies: string = this.cookies.get('IdUsuario');
  nombreUsuarioCookies: string = this.cookies.get('Nombre');

  modalEditarActividad: BsModalRef;
  modalMensaje: BsModalRef;
  lblModalMsaje: string;

  //Variables Agregar
  modalAgregar: BsModalRef;


  //Variables Agregar Registro
  IdAgregarProyecto: string;

  constructor(private _modalService: BsModalService,
    private Servicios: MetodosGlobalesService,
    private cookies: CookieService
  ) { }

  ngOnInit(): void {
    this.consultaProyecto();
    this.consultaTareas();
    this.Grilla('0', '0', '0');
  }

  arGrilla: any = [];
  usuario: string;
  proyecto: string = '0';
  tarea: string = '0';

  Grilla(usuario: string, proyecto: string, tarea: string) {
    var auxUsuario: string;
    if (usuario == undefined || usuario == '') {
      auxUsuario = '0'
    } else {
      auxUsuario = usuario;
    }

    const consregistros = {
      IdActividad: 0,
      Id_U: this.IdUsuarioCookies,
      Id_Pry: proyecto,
      IdTipoTarea: tarea,
      DescripcionTarea: 0,
      Tiempo: 0,
      FechaRegistro: 0,
      Usuario: auxUsuario
    }
    this.Servicios.consregistrotareas('1', consregistros).subscribe(respu => {
      console.log(respu);
      this.arGrilla = respu;
    })
  }

  agregarProyecto: string = '0';
  agregarTarea: string = '0';
  agregarTiempo: string = '0';
  agregarDescripcion: string = '';

  AgregaActividad(templateMensaje: TemplateRef<any>) {
    if (this.agregarProyecto == '0' || this.agregarProyecto == undefined || this.agregarTarea == '0'
      || this.agregarTarea == undefined || this.agregarDescripcion == '' || this.agregarDescripcion == undefined
      || this.agregarTiempo == '0' || this.agregarTiempo == undefined) {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = "Complete todos los campos para completar el registro";
    } else {
      const insertActividad = {
        IdActividad: 0,
        Id_U: this.IdUsuarioCookies,
        Id_Pry: this.agregarProyecto,
        IdTipoTarea: this.agregarTarea,
        Descripcion: this.agregarDescripcion,
        Tiempo: this.agregarTiempo
      }
      this.Servicios.insertaregtareasmod('3', insertActividad).subscribe(respu => {
        if (respu.length > 0) {
          this.modalMensaje = this._modalService.show(templateMensaje);
          this.lblModalMsaje = respu;
          this.Grilla(this.usuario, this.proyecto, this.tarea);

          this.modalAgregar.hide();
          this.Limpiar();
        }
      })
    }
  }

  ActualizActividad(templateMensaje: TemplateRef<any>) {
    if (this.arregloEditar.DescripcionTarea == '' || this.arregloEditar.DescripcionTarea == undefined
      || this.arregloEditar.Tiempo == '' || this.arregloEditar.Tiempo == undefined) {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = "Complete todos los campos para completar el registro";
    } else {
      const actActividad = {
        IdActividad: this.arregloEditar.IdActividad,
        Id_U: this.IdUsuarioCookies,
        Id_Pry: this.arregloEditar.Id_Pry,
        IdTipoTarea: this.arregloEditar.IdTipoTarea,
        Descripcion: this.arregloEditar.DescripcionTarea,
        Tiempo: this.arregloEditar.Tiempo
      }
      this.Servicios.actualizaregtareasmod('2', actActividad).subscribe(respu => {
        if (respu == 'Registro actualizado correctamente.') {
          this.modalMensaje = this._modalService.show(templateMensaje);
          this.lblModalMsaje = respu;
          this.Grilla(this.usuario, this.proyecto, this.tarea);

          this.modalEditarActividad.hide();
          this.Limpiar();
        }
      })
    }
  }

  eliminarActividad(templateMensaje: TemplateRef<any>, Arr: any) {
    const elimActividad = {
      IdActividad: Arr.IdActividad,
      Id_U: this.IdUsuarioCookies,
      Id_Pry: Arr.Id_Pry,
      IdTipoTarea: Arr.IdTipoTarea,
      Descripcion: Arr.DescripcionTarea,
      Tiempo: Arr.Tiempo
    }
    this.Servicios.eliminaregtareamod('4', elimActividad).subscribe(respu => {
      console.log(respu);
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = respu;
      this.Limpiar();
    })
  }


  arProyect: any[];
  consultaProyecto() {

    this.Servicios.consultaproyect('1', '0', '0').subscribe(respu => {
      this.arProyect = respu;

    })
  }

  arTarea: any[];
  consultaTareas() {
    this.Servicios.conslistatarea().subscribe(respu => {
      this.arTarea = respu;
    })
  }

  arregloEditar: any;

  BtnEditarActividad(templateeditaractividad: TemplateRef<any>, i: any) {
    this.modalEditarActividad = this._modalService.show(templateeditaractividad);
    this.modalEditarActividad.setClass('modal-lg');
    this.arregloEditar = i;
  }

  BtnNuevo(templateAgregar: TemplateRef<any>) {
    this.modalAgregar = this._modalService.show(templateAgregar);
    this.modalAgregar.setClass('modal-lg');
  }
  Limpiar() {

    this.proyecto = '0';
    this.tarea = '0';

    this.Grilla(this.usuario, this.proyecto, this.tarea);
  }
}
