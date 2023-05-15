import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ConexionprincipalService {

    constructor(private http: HttpClient) { }
    //ambiente de trabajo 1 desarrollo 2 produccion
    ambientedetrabajo: string = '2';

    //    public url_ProduccionCDI = 'http://192.168.3.186:1003/AdministradorCDI/';
    public url_ProduccionCDI = 'http://192.168.3.186:1005/AdministradorCDI/';



    SeleccionAmbiente() {
        if (this.ambientedetrabajo == '2') {
            return this.url_ProduccionCDI;
        }
        else {
            return "Valida ambiente seleccionado";
        }
    }

}