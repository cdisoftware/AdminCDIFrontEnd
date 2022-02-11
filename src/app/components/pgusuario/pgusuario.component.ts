import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pgusuario',
  templateUrl: './pgusuario.component.html',
  styleUrls: ['./pgusuario.component.css']
})
export class PgusuarioComponent implements OnInit {

  constructor(private cookies: CookieService) { }

  //Variables obtienen info
  Nombre: string =  this.cookies.get('Nombre');
  Apellido: string =  this.cookies.get('Apellido');
  ngOnInit(): void {
  }

}
