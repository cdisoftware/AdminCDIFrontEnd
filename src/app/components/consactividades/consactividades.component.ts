import { Component, OnInit, TemplateRef } from '@angular/core';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { Workbook } from "exceljs";

@Component({
  selector: 'app-consactividades',
  templateUrl: './consactividades.component.html',
  styleUrls: ['./consactividades.component.css']
})
export class ConsactividadesComponent implements OnInit {

  IdUsuarioCookies: string = this.cookies.get('IdUsuario');

  nombreUsuarioCookies: string = this.cookies.get('Nombre');

  constructor(private modalService: BsModalService,
    private Servicios: MetodosGlobalesService,
    private modalServiceDos: NgbModal,
    private cookies: CookieService
  ) { }

  //Variables Fecha
  Dia = new Date().getDate();
  Mes = new Date().getMonth() + 1;
  Año = new Date().getFullYear();
  Fecha: string = this.Año + '-' + this.Mes + '-' + this.Dia;


  ngOnInit(): void {
    this.consultaProyecto();
    this.consultaTareas();
    this.Grilla('0', '0', '0', '0');
  }
  arGrilla: any = [];
  usuario: string;
  fecha: string = '0';
  proyecto: string = '0';
  tarea: string = '0';


  Grilla(usuario: string, fecha: string, proyecto: string, tarea: string) {
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
      FechaRegistro: fecha,
      Usuario: auxUsuario
    }
    this.Servicios.consregistrotareas('1', consregistros).subscribe(respu => {
      this.arGrilla = respu;
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
  Limpiar() {

    this.fecha = '0';
    this.proyecto = '0';
    this.tarea = '0';


    this.Grilla(this.usuario, this.fecha, this.proyecto, this.tarea);
  }
  //Descargar Pdf
  DescargarDatosPdf() {
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

      },
      didParseCell: function (data) {
        var rows = data.table.body;
        if (data.row.index === 0) {
          data.cell.styles.fillColor = [0, 80, 80];
          data.cell.styles.textColor = [255, 255, 255];
        }
      },
      margin: { top: 10 },
      body: [
        ['Funcionario', 'Fecha', 'Proyecto', 'Tipo Tarea', 'Descripcion', 'Tiempo'],
      ]
    })

    if (this.arGrilla.length > 0) {
      this.arGrilla.forEach(function (respuesta: any) {

        var Res = [respuesta.Usuario, respuesta.FechaRegistro, respuesta.Proyecto, respuesta.TipoTarea, respuesta.DescripcionTarea, respuesta.Tiempo];

        autoTable(doc, {
          margin: { top: 0, bottom: 0 },
          columnStyles: {
            1: { cellWidth: 96 },
            2: { cellWidth: 96 },
            3: { cellWidth: 96 },
            4: { cellWidth: 96 },
            5: { cellWidth: 96 },
            6: { cellWidth: 96 },

          },
          body:
            [
              Res
            ]
        })
      });

      doc.save('Actividades_Diarias - ' + this.Fecha + '.pdf')
    }
  }
  //Descargar Excel
  BtnExportarExcel() {
    if (this.arGrilla.length > 0) {
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet("Registro servidores");
      let header = ['Funcionario', 'Fecha', 'Proyecto', 'Tipo Tarea', 'Descripcion', 'Tiempo'];
      worksheet.addRow(header);

      for (let x1 of this.arGrilla) {
        let temp = []
        temp.push(x1['Usuario'])
        temp.push(x1['FechaRegistro'])
        temp.push(x1['Proyecto'])
        temp.push(x1['TipoTarea'])
        temp.push(x1['DescripcionTarea'])
        temp.push(x1['Tiempo'])

        worksheet.addRow(temp)
      }

      let fname = "Actividades_Diarias - " + this.Fecha;

      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, fname + '.xlsx');
      });
    }
  }

}
