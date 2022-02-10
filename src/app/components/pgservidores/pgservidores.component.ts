import { Component, OnInit, TemplateRef } from '@angular/core';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Workbook } from "exceljs";
import { saveAs } from 'file-saver';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pgservidores',
  templateUrl: './pgservidores.component.html',
  styleUrls: ['./pgservidores.component.css']
})
export class PgservidoresComponent implements OnInit {
  //Usuario
  IdUsuarioCookies: string = this.cookies.get('IdUsuario');
  //Variables globales
  lblModalMsaje: string;
  modalMensaje: BsModalRef;
  modalAgregar: BsModalRef;

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

  //Variables agregar servidor
  LblIpServidor: string;
  LblNombre: string;
  LblSO: string;
  LblSoftware: string;
  IdEstadoAgregar: string;
  Id_TipoServidor: string;
  LblObservacion: string;
  LblUsuarios: string;
  LblPassword: string;
  IdServidorAloja: string;

  //Variables Fecha
  Dia = new Date().getDate();
  Mes = new Date().getMonth() + 1;
  Año = new Date().getFullYear();
  Fecha: string = this.Año + '-' + this.Mes + '-' + this.Dia;

  //Variables lista agregar servidor
  ArregloListaServidor: any;

  //Variables lista agregar servidor
  ArregloListaTipoServidor: any;

  //Variables ver detalles
  LblUsuario: string;
  LblPasswordVer: string;
  LblServidor: string;
  ArrListaHardware: any;

  //Variables editar servidor
  modalEditarServidor: BsModalRef;
  LblIpServidorEdit: string;
  LblNombreEdit: string;
  LblSOEdit: string;
  LblSoftwareEdit: string;
  IdEstadoAgregarEdit: string;
  Id_TipoServidorEdit: string;
  LblObservacionEdit: string;
  LblUsuariosEdit: string;
  LblPasswordEdit: string;
  IdServidorAlojaEdit: string;

  //Variables agregar hardware
  AuxiliarDiv: boolean;
  modalAgregarHardware: BsModalRef;
  IdServidor: string;
  LblDiscoDuro: string;
  LblRam: string;
  LblProcesador: string;

  //Variables agregar hardware
  modalEditarHardware: BsModalRef;
  LblDiscoDuroEdit: string;
  LblRamEdit: string;
  LblProcesadorEdit: string;

  //Variables editar servidor
  modalEditarSer: BsModalRef;

  constructor(private _modalService: BsModalService,
    private Servicios: MetodosGlobalesService,
    private modalServiceDos: NgbModal,
    private cookies: CookieService
  ) { }

  ngOnInit(): void {
    this.IdEstado = '2';
    this.IdUsuario = '0';
    this.lblNombreservidor = '';
    this.lblSO = '';

    //Inicializar variables agregar servidor
    this.LblIpServidor = "";
    this.LblNombre = "";
    this.LblSO = "";
    this.LblSoftware = "";
    this.IdEstadoAgregar = "2";
    this.Id_TipoServidor = "0";
    this.LblObservacion = "";
    this.LblUsuarios = "";
    this.LblPassword = '';
    this.IdServidorAloja = "0";

    //Inicializar variables editar servidor
    this.LblIpServidorEdit = '';
    this.LblNombreEdit = '';
    this.LblSOEdit = '';
    this.LblSoftwareEdit = '';
    this.IdEstadoAgregarEdit = '';
    this.Id_TipoServidorEdit = '';
    this.LblObservacionEdit = '';
    this.LblUsuariosEdit = '';
    this.LblPasswordEdit = '';


    this.Grilla(this.lblNombreservidor, this.lblSO, this.IdEstado, this.IdUsuario);
    this.ListaUsuario();
    this.ListaServidor();
    this.ListaTipoServidor();
  }

  Limpiar() {
    this.IdEstado = '2';
    this.IdUsuario = '0';
    this.lblNombreservidor = '';
    this.lblSO = '';

    //Limpiar variables agregar servidor
    this.LblIpServidor = "";
    this.LblNombre = "";
    this.LblSO = "";
    this.LblSoftware = "";
    this.IdEstadoAgregar = "2";
    this.Id_TipoServidor = "0";
    this.LblObservacion = "";
    this.LblUsuarios = "";
    this.LblPassword = '';
    this.IdServidorAloja = "0";


    //Limpiar variables editar servidor
    this.LblIpServidorEdit = '';
    this.LblNombreEdit = '';
    this.LblSOEdit = '';
    this.LblSoftwareEdit = '';
    this.IdEstadoAgregarEdit = '';
    this.Id_TipoServidorEdit = '';
    this.LblObservacionEdit = '';
    this.LblUsuariosEdit = '';
    this.LblPasswordEdit = '';

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

  ListaUsuario() {
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


  //Popap agregar
  BtnNuevo(templateAgregar: TemplateRef<any>) {
    this.modalAgregar = this._modalService.show(templateAgregar)
    this.LblPassword = '';
  }
  AgregarServidor(templateMensaje: TemplateRef<any>) {
    if (this.LblIpServidor == undefined || this.LblIpServidor == '' || this.LblNombre == undefined || this.LblNombre == '' || this.LblSO == undefined || this.LblSO == '' ||
      this.LblSoftware == undefined || this.LblSoftware == '' || this.IdEstadoAgregar == undefined || this.IdEstadoAgregar == '' || this.Id_TipoServidor == undefined || this.Id_TipoServidor == ''
      || this.LblObservacion == undefined || this.LblObservacion == '' || this.LblUsuarios == undefined || this.LblUsuarios == '' || this.LblPassword == undefined || this.LblPassword == ''
      || this.IdServidorAloja == undefined || this.IdServidorAloja == '') {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = "Por favor complete los campos a agregar";
    } else {
      const InsertaServidor = {
        Ip_S: this.LblIpServidor,
        Nombre: this.LblNombre,
        SO: this.LblSO,
        Software: this.LblSoftware,
        Estado: this.IdEstadoAgregar,
        Id_Tipo_S: this.Id_TipoServidor,
        Observacion: this.LblObservacion,
        Usuario_Ser: this.LblUsuarios,
        Password: this.LblPassword,
        Servicio_aloja: this.IdServidorAloja,
        Id_U: this.IdUsuarioCookies,
        Fecha_Ult_Mod: this.Fecha
      }
      this.Servicios.insertaserv('3', InsertaServidor).subscribe(respu => {
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = respu;

        this.Limpiar();

        this.modalAgregar.hide();
      })
    }
  }
  ListaServidor() {
    this.ArregloListaServidor = [];
    this.Servicios.consultaservidors('1', '0', '0', '2', '0').subscribe(respu => {
      if (respu.length > 0) {
        this.ArregloListaServidor = respu;
      }
    })
  }
  ListaTipoServidor() {
    this.ArregloListaTipoServidor = [];
    const ListaTipoServidor = {
      Descripcion: '0'
    }
    this.Servicios.consultatiposerv('0', ListaTipoServidor).subscribe(respu => {
      if (respu.length > 0) {
        this.ArregloListaTipoServidor = respu;
      }
    })
  }

  //Ver detalle
  VerDetalle(templateVerDetalles: TemplateRef<any>, templateMensaje: TemplateRef<any>, ArGrilla: any) {
    this.AuxiliarDiv = false;
    this.modalServiceDos.open(templateVerDetalles, { size: 'xl' });
    this.ArrListaHardware = [];
    this.Servicios.consultahardware(ArGrilla.Id_S, '0', '0', '0').subscribe(respu => {
      if (respu.length > 0) {
        this.ArrListaHardware = respu;
        this.AuxiliarDiv = false;
      } else {
        this.AuxiliarDiv = true;
        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = 'No existe hardware inscrito para este servidor, por favor ingreselo';
      }
    })
    this.LblUsuario = ArGrilla.Usuario_Ser;
    this.LblPasswordVer = ArGrilla.Password;
    this.LblServidor = ArGrilla.NombreServidorAloja;
    this.IdServidor = ArGrilla.Id_S;
  }

  //Descargar Pdf
  DescargarDatosPdf(templateMensaje: TemplateRef<any>) {
    const doc = new jsPDF('l', 'px', 'a3');

    autoTable(doc, {
      styles: { fillColor: [236, 240, 241] },
      columnStyles: {
        1: { cellWidth: 96 },
        2: { cellWidth: 96 },
        3: { cellWidth: 96 },
        4: { cellWidth: 96 },
        5: { cellWidth: 96 },
        6: { cellWidth: 96 },
        7: { cellWidth: 96 },
        8: { cellWidth: 96 },
        9: { cellWidth: 96 }
      },
      didParseCell: function (data) {
        var rows = data.table.body;
        if (data.row.index === 0) {
          data.cell.styles.fillColor = [0, 80, 80];
        }
      },
      margin: { top: 10 },
      body: [
        ['Ip', 'Nombre', 'Sistema Operativo', 'Software', 'Estado', 'Ultima mod', 'Observación', 'Tipo Servidor', 'Fecha ultima Mod'],
      ]
    })

    if (this.ArregloGrilla.length > 0) {
      this.ArregloGrilla.forEach(function (respuesta: any) {

        var Res = [respuesta.Ip_S, respuesta.Nombre, respuesta.SO, respuesta.Software, respuesta.Estado, respuesta.UsuarioUltMod, respuesta.Observacion, respuesta.TipoServidor,
        respuesta.Fecha_Ult_Mod];

        autoTable(doc, {
          margin: { top: 0, bottom: 0 },
          columnStyles: {
            1: { cellWidth: 96 },
            2: { cellWidth: 96 },
            3: { cellWidth: 96 },
            4: { cellWidth: 96 },
            5: { cellWidth: 96 },
            6: { cellWidth: 96 },
            7: { cellWidth: 96 },
            8: { cellWidth: 96 },
            9: { cellWidth: 96 }
          },
          body:
            [
              Res
            ]
        })
      });

      doc.save('Registro servidores - ' + this.Fecha + '.pdf')
    } else {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = 'No existen registros disponibles, por favor seleccione otros filtros';
    }
  }


  //Descargar Excel
  BtnExportarExcel(templateMensaje: TemplateRef<any>) {
    if (this.ArregloGrilla.length > 0) {
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet("Registro servidores");
      let header = ['Ip', 'Nombre', 'Sistema Operativo', 'Software', 'Estado', 'Ultima mod', 'Observación', 'Tipo Servidor', 'Fecha ultima Mod'];
      worksheet.addRow(header);

      for (let x1 of this.ArregloGrilla) {
        let temp = []
        temp.push(x1['Ip_S'])
        temp.push(x1['Nombre'])
        temp.push(x1['SO'])
        temp.push(x1['Software'])
        if (x1['Estado'] == 1) {
          temp.push('Exitoso')
        } else {
          temp.push('Error')
        }
        temp.push(x1['UsuarioUltMod'])
        temp.push(x1['Observacion'])
        temp.push(x1['TipoServidor'])
        temp.push(x1['Fecha_Ult_Mod'])

        worksheet.addRow(temp)
      }

      let fname = "Registro servidores - " + this.Fecha;

      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, fname + '.xlsx');
      });
    } else {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = 'No existen registros disponibles, por favor seleccione otros filtros';
    }
  }




  //Editar Servidor
  EditarServidor(templateEditarServidor: TemplateRef<any>, Array: any) {
    this.modalEditarServidor = this._modalService.show(templateEditarServidor);
    this.LblIpServidorEdit = Array.Ip_S;
    this.LblNombreEdit = Array.Nombre;
    this.LblSOEdit = Array.SO;
    this.LblSoftwareEdit = Array.Software;
    this.IdEstadoAgregarEdit = Array.Estado;
    this.Id_TipoServidorEdit = Array.IdTipoServidor;
    this.LblObservacionEdit = Array.Observacion;
    this.LblUsuariosEdit = Array.Usuario_Ser;
    this.LblPasswordEdit = Array.Password;
    if (Array.Servidor_Aloja == undefined || Array.Servidor_Aloja == '') {
      this.IdServidorAlojaEdit = '0';
    } else {
      this.IdServidorAlojaEdit = Array.Servidor_Aloja;
    }
  }
  UpdateServDos(templateMensaje: TemplateRef<any>) {
    const Update = {
      Id_S: 29,
      Ip_S: this.LblIpServidorEdit,
      Nombre: this.LblNombreEdit,
      SO: this.LblSOEdit,
      Software: this.LblSoftwareEdit,
      Estado: this.IdEstadoAgregarEdit,
      Id_Tipo_S: this.Id_TipoServidorEdit,
      Observacion: this.LblObservacionEdit,
      Usuario_Ser: "0",
      Password: "0",
      ServicioAloja: 0,
      Id_U: this.IdUsuarioCookies,
      Fecha_Ult_Mod: this.Fecha
    }
    this.Servicios.actualizaservdos('2', Update).subscribe(respu => {
      if (respu == 'Servidor actualizado exitosamente.') {

        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = respu;

        this.modalEditarServidor.hide();

        this.Grilla(this.lblNombreservidor, this.lblSO, this.IdEstado, this.IdUsuario);

      } else {

        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = 'Por favor verefique los datos a actualizar.';
      }
    })
  }




  //Popap agregar hardware
  AbrirpopapHardware(templateAgregarHARDWARE: TemplateRef<any>) {
    this.modalAgregarHardware = this._modalService.show(templateAgregarHARDWARE);
  }
  InsetHardware(templateMensaje: TemplateRef<any>) {
    const Insert = {
      Id_S: this.IdServidor,
      DiscoDuro: this.LblDiscoDuro,
      RAM: this.LblRam,
      Procesador: this.LblProcesador
    }
    this.Servicios.insertarhardserv('3', Insert).subscribe(respu => {
      if (respu == 'Hardware de servidor registrado exitosamente.') {

        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = respu;

        this.modalAgregarHardware.hide();

        this.ArrListaHardware = [];
        this.Servicios.consultahardware(this.IdServidor, '0', '0', '0').subscribe(respu => {
          if (respu.length > 0) {
            this.ArrListaHardware = respu;
            this.AuxiliarDiv = false;
          }
        })

      } else {

        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = 'Por favor verefique los datos a ingresar.';
      }
    })


  }

  //Popap editar hardware
  Editar(templateEditarHARDWARE: TemplateRef<any>, Array: any) {
    this.modalEditarHardware = this._modalService.show(templateEditarHARDWARE);

    this.LblDiscoDuroEdit = Array.DiscoDuro;
    this.LblRamEdit = Array.RAM;
    this.LblProcesadorEdit = Array.Procesador;
  }
  updateHardware(templateMensaje: TemplateRef<any>) {
    const Update = {
      Id_S: this.IdServidor,
      DiscoDuro: this.LblDiscoDuroEdit,
      RAM: this.LblRamEdit,
      Procesador: this.LblProcesadorEdit
    }
    this.Servicios.actualizachardserv('2', Update).subscribe(respu => {
      if (respu == 'Hardware de servidor actualizado exitosamente.') {

        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = respu;

        this.modalEditarHardware.hide();

        this.ArrListaHardware = [];
        this.Servicios.consultahardware(this.IdServidor, '0', '0', '0').subscribe(respu => {
          if (respu.length > 0) {
            this.ArrListaHardware = respu;
            this.AuxiliarDiv = false;
          }
        })

      } else {

        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = 'Por favor verefique los datos a actualizar.';
      }
    })
  }





  //EditarVerDetalles servidor
  EditarServ(templateEditarServidorVerDetalles: TemplateRef<any>, ServidorAlo: string) {
    this.modalEditarSer = this._modalService.show(templateEditarServidorVerDetalles);
    this.LblUsuariosEdit = this.LblUsuario;
    this.LblPasswordEdit = this.LblPasswordVer;
    if (ServidorAlo == undefined || ServidorAlo == '') {
      this.IdServidorAlojaEdit = '0';
    } else {
      this.IdServidorAlojaEdit = ServidorAlo;
    }
  }
  UpdateSerVer(templateMensaje: TemplateRef<any>) {
    const update = {
      Id_S: this.IdServidor,
      Ip_S: "0",
      Nombre: "0",
      SO: "0",
      Software: "0",
      Estado: 0,
      Id_Tipo_S: 0,
      Observacion: "0",
      Usuario_Ser: this.LblUsuariosEdit,
      Password: this.LblPasswordEdit,
      ServicioAloja: this.IdServidorAlojaEdit,
      Id_U: this.IdUsuarioCookies,
      Fecha_Ult_Mod: this.Fecha
    }
    this.Servicios.actualizaservcuatro('4', '11', update).subscribe(respu => {
      if (respu == 'Servidor actualizado exitosamente.') {

        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = respu;

        this.modalEditarSer.hide();

        this.Limpiar();

      } else {

        this.modalMensaje = this._modalService.show(templateMensaje);
        this.lblModalMsaje = 'Por favor verefique los datos a ingresar.';
      }
    })
  }

  //Descargar pdf de ver detalles
  DescargaPDF() {
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };


    var DATAg = document.getElementById('htmlData_');
    if (DATAg != null) {
      html2canvas(DATAg, options).then((canvas) => {
        var imgDos = canvas.toDataURL('image/PNG');
        var imgPropDso = (doc as any).getImageProperties(imgDos);

        var pdfWidthDso = doc.internal.pageSize.getWidth() - 2 * 15;
        var pdfHeightDso = (imgPropDso.height * pdfWidthDso) / imgPropDso.width;

        doc.addImage(imgDos, 'PNG', 15, 15, pdfWidthDso, pdfHeightDso, undefined, 'FAST');

        doc.save('Detalles servidor.pdf');//Agregar el nombre de el servidor mas la fecha
      })
    }
  }



  //Eliminar servidor
  EliminaServidor(templateMensaje: TemplateRef<any>, Arr: any) {
    const delet = {
      Id_S: Arr.Id_S,
      Nombre: Arr.Nombre
    }
    this.Servicios.eliminaservidor('4', delet).subscribe(respu => {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = respu;
      this.Limpiar();
    })
  }
  EliminaHardwareServidor(templateMensaje: TemplateRef<any>, Arr: any) {
    console.log(Arr)
    const delet = {
      Id_S: Arr.IdentificadorServidor
    }
    this.Servicios.eliminahardserv('4', delet).subscribe(respu => {
      this.modalMensaje = this._modalService.show(templateMensaje);
      this.lblModalMsaje = respu;
      this.ArrListaHardware = [];
      this.Servicios.consultahardware(this.IdServidor, '0', '0', '0').subscribe(respu => {
        if (respu.length > 0) {
          this.ArrListaHardware = respu;
          this.AuxiliarDiv = false;
        }
      })
    })
  }
}