import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConexionprincipalService } from './conexionprincipal.service';

@Injectable({
    providedIn: 'root'
})
export class MetodosGlobalesService {

    constructor(private http: HttpClient, private serviciosconexion: ConexionprincipalService) { }

    url_servidor = this.serviciosconexion.SeleccionAmbiente();

    consultabackup(NombreBck: string, Ip: string, usuario:string, cliente: string) {
        return this.http.get<any[]>(this.url_servidor + 'consultabackup/' + NombreBck + '/' + Ip + '/' + usuario + '/' + cliente)
    }
    consultausuarios() {
        return this.http.get<any[]>(this.url_servidor + 'consultausuarios')
    }
    consultaproyect(bandera: string) {
        return this.http.get<any[]>(this.url_servidor + 'consultaproyect/' + bandera)
    }

    insertarbackup(ORIGEN: string, BodyPost: any) {
        return this.http.post<any>(this.url_servidor + 'insertarbackup/' + ORIGEN, BodyPost)
    }
}