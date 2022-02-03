import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConexionprincipalService } from './conexionprincipal.service';

@Injectable({
  providedIn: 'root',
})
export class MetodosGlobalesService {
  constructor(
    private http: HttpClient,
    private serviciosconexion: ConexionprincipalService
  ) { }

  url_servidor = this.serviciosconexion.SeleccionAmbiente();

  consultavalidlogin(BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'consultavalidlogin', BodyPost);
  }

  consultabackup(NombreBck: string, Ip: string, usuario: string, cliente: string) {
    return this.http.get<any[]>(this.url_servidor + 'consultabackup/' + NombreBck + '/' + Ip + '/' + usuario + '/' + cliente);
  }
  consultausuarios(BodyPost: any) {
    return this.http.post<any[]>(this.url_servidor + 'consultausuarios', BodyPost);
  }
  consultaproyect(bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consultaproyect/' + bandera);
  }
  insertarbackup(Bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'insertarbackup/' + Bandera, BodyPost);
  }
  actualizabackup(Bandera: string, BodyPost: any) {
    return this.http.put<any>(this.url_servidor + 'actualizabackup/' + Bandera, BodyPost);
  }

  consultaregistbck(IdUsuario: number, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'consultaregistbck/' + IdUsuario, BodyPost);
  }
  consultaservidors(bandera: string, NomServidor: string, SO: string, Estado: string, Usuario: string) {
    return this.http.get<any[]>(this.url_servidor + 'consultaservidors/' + bandera + '/' + NomServidor + '/' + SO + '/' + Estado + '/' + Usuario);
  }
  consultatipobck(BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'consultatipobck', BodyPost);
  }
  insertaregistbck(BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'insertaregistbck', BodyPost);
  }
  insertaserv(Bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'insertaserv/' + Bandera, BodyPost);
  }
  consultatiposerv(IdTipoServidor: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'consultatiposerv/' + IdTipoServidor, BodyPost);
  }
  insertatiposervidor(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'insertatiposervidor/' + bandera, BodyPost);
  }
  actualizatiposervidor(bandera: string, BodyPost: any) {
    return this.http.put<any>(this.url_servidor + 'actualizatiposervidor/' + bandera, BodyPost);
  }
  insertausuario(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'insertausuario/' + bandera, BodyPost);
  }
  actualizausuario(bandera: string, BodyPost: any) {
    return this.http.put<any>(this.url_servidor + 'actualizausuario/' + bandera, BodyPost);
  }
  actualizatipobackup(bandera: string, BodyPost: any) {
    return this.http.put<any>(this.url_servidor + 'actualizatipobackup/' + bandera, BodyPost);
  }
  insertatipobackup(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'insertatipobackup/' + bandera, BodyPost);
  }
  consultahardware(IdServidor: string, DiscoDuro: string, Ram: string, Procesador: string) {
    return this.http.get<any[]>(this.url_servidor + 'consultahardware/' + IdServidor + '/' + DiscoDuro + '/' + Ram + '/' + Procesador);
  }
  insertarhardserv(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'insertarhardserv/' + bandera, BodyPost);
  }
}
