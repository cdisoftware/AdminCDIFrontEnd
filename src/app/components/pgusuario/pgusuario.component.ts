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
  IdUsuariokookies: string = this.cookies.get('IdUsuario');
  Nombre: string = this.cookies.get('Nombre');
  Apellido: string = this.cookies.get('Apellido');
  ImgPerfil: string;

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

  //Variables fecha
  ButtonsInput: boolean = false;
  ButtonsImg: boolean = true;

  ngOnInit(): void {
    this.TraenfoUser();
  }


  //Variables
  Direccion: string;
  Telefono: string;
  Email: string;
  TraenfoUser() {
    this.Servicios.consultainfouser(this.IdUsuariokookies).subscribe(respu => {
      this.Direccion = respu[0].Direccion;
      this.Telefono = respu[0].Telefono;
      this.Email = respu[0].Email;
      console.log(respu)
      if (respu[0].UrlFoto == undefined || respu[0].UrlFoto == null || respu[0].UrlFoto == '') {
        this.ImgPerfil = 'http://192.168.3.186:8092/ImgDefaulUsario.png';
      } else {
        this.ImgPerfil = respu[0].UrlFoto;
      }
    });
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
      Id_U: this.IdUsuariokookies,
      Nombre: this.NombreEdit,
      Apellido: this.ApellidoEdit,
      Password: this.Password,
      Direccion: this.Direccion,
      Telefono: this.Telefono,
      Email: this.Email
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

            const ActualizaImg = {
              UrlFoto: this.imgRuedaForm
            }
            this.Servicios.modificaimagen(this.IdUsuariokookies, ActualizaImg).subscribe(respu => {
              this.modalMensaje = this._modalService.show(templateMensaje);
              this.lblModalMsaje = respu;

              this.TraenfoUser();
              this.VerButons();
            });

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

  VerFile() {
    this.ButtonsInput = true;
    this.ButtonsImg = false;
  }

  VerButons() {
    this.ButtonsInput = false;
    this.ButtonsImg = true;
  }

}
