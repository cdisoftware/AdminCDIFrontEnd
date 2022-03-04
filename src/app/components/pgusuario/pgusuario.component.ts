import { Component, OnInit, TemplateRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pgusuario',
  templateUrl: './pgusuario.component.html',
  styleUrls: ['./pgusuario.component.css']
})
export class PgusuarioComponent implements OnInit {

  constructor(private cookies: CookieService,
    private Servicios: MetodosGlobalesService,
    private _modalService: BsModalService) { }

  //Variables obtienen info
  Nombre: string = this.cookies.get('Nombre');
  Apellido: string = this.cookies.get('Apellido');

  NombreEdit: string = this.Nombre;
  ApellidoEdit: string = this.Apellido;
  Usuario: string = this.cookies.get('Usuario');
  Password: string = this.cookies.get('Password');
  UjusteGuarda: boolean = false;

  //variable imagenes
  imgRuedaForm: string = "";

  //variables modal mensajes
  lblModalMsaje: string;
  modalMensaje: BsModalRef;
  ngOnInit(): void {
  }

  True() {
    this.UjusteGuarda = true;
  }
  False(templateMensaje: TemplateRef<any>) {
    this.UjusteGuarda = false;
    this.ActualizarInfo(templateMensaje);
  }

  ActualizarInfo(templateMensaje: TemplateRef<any>) {
    const Actualizar = {
      Id_U: 1011,
      Nombre: this.NombreEdit,
      Apellido: this.ApellidoEdit,
      Usuario: this.Usuario,
      Password: this.Password
    }
    this.Servicios.actualizainfousuario('2', Actualizar).subscribe(respu => {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = respu;
    });
  }


  cargandoImagen(event: any, templateMensaje: TemplateRef<any>) {


    if (!(/\.(jpg|png)$/i).test(event.target.files[0].name)) {

      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = "La imagen no pudo ser cargada, el archivo a adjuntar no es una imagen";
    }
    else if (event.target.files[0].size > 1000000) {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = "La imagen no pudo ser cargada, valide las dimensiones de la imagen, el peso de la imagen no puede exceder 1 megabyte";
    } else {
      this.Servicios.postFileImagen(event.target.files[0]).subscribe(
        response => {
          if (response == 'Archivo Subido Correctamente') {

            this.imgRuedaForm = 'http://192.168.3.186:8092/' + event.target.files[0].name;
            console.log(this.imgRuedaForm)
          } else {
            this.lblModalMsaje = 'No hemos podido subir la imagen, intenta nuevamente';
            this.modalMensaje = this._modalService.show(templateMensaje);
          }
        },
        error => {
          console.log(<any>error);
          this.lblModalMsaje = 'No hemos podido subir la imagen, intenta nuevamente';
          this.modalMensaje = this._modalService.show(templateMensaje);
        }
      );
    }
  }

}
