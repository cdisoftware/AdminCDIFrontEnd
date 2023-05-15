import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-pgaplicaciones',
  templateUrl: './pgaplicaciones.component.html',
  styleUrls: ['./pgaplicaciones.component.css']
})
export class PgaplicacionesComponent implements OnInit {

  modalAgregar: BsModalRef;
  modalEditar: BsModalRef;

  constructor(private _modalService: BsModalService,) { }

  ngOnInit(): void {
  }

  //Popap agregar
  BtnAgregar(templateAgregar: TemplateRef<any>) {
    this.modalAgregar = this._modalService.show(templateAgregar);
    this.modalAgregar.setClass('modal-lg');
  }

  //Editar Servidor
  BtnEditar(templateEditar: TemplateRef<any>) {
    this.modalEditar = this._modalService.show(templateEditar);
    this.modalEditar.setClass('modal-lg');

  }

}
