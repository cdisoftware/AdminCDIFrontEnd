import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pgregtroactividades',
  templateUrl: './pgregtroactividades.component.html',
  styleUrls: ['./pgregtroactividades.component.css']
})

export class PgregtroactividadesComponent implements OnInit {

  modalEditarActividad: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }
  BtnEditarActividad(templateeditaractividad: TemplateRef<any>) {
    this.modalEditarActividad = this.modalService.show(templateeditaractividad)
  }
}
