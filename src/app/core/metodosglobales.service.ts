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
  consultaproyect(bandera: string, Nombre: string, IdCliente: string) {
    return this.http.get<any[]>(this.url_servidor + 'consultaproyect/' + bandera + '/' + Nombre + '/' + IdCliente);
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
  actualizaservdos(bandera: string, BodyPost: any) {
    return this.http.put<any>(this.url_servidor + 'actualizaservdos/' + bandera, BodyPost);
  }
  consultacliente(BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'consultacliente', BodyPost);
  }
  insertaproyecto(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'insertaproyecto/' + bandera, BodyPost);
  }
  insertarcliente(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'insertarcliente/' + bandera, BodyPost);
  }
  actualizaproyecto(bandera: string, BodyPost: any) {
    return this.http.put<any>(this.url_servidor + 'actualizaproyecto/' + bandera, BodyPost);
  }
  actualizacliente(bandera: string, BodyPost: any) {
    return this.http.put<any>(this.url_servidor + 'actualizacliente/' + bandera, BodyPost);
  }
  consgrilaproyectbck(IdProyecto: string) {
    return this.http.get<any[]>(this.url_servidor + 'consgrilaproyectbck/' + IdProyecto);
  }


  eliminaservidor(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'eliminaservidor/' + bandera, BodyPost);
  }
  eliminabackup(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'eliminabackup/' + bandera, BodyPost);
  }
  eliminaproyect(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'eliminaproyect/' + bandera, BodyPost);
  }
  eliminausuario(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'eliminausuario/' + bandera, BodyPost);
  }
  eliminaclient(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'eliminaclient/' + bandera, BodyPost);
  }
  eliminahardserv(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'eliminahardserv/' + bandera, BodyPost);
  }
  eliminatiposerv(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'eliminatiposerv/' + bandera, BodyPost);
  }
  eliminatipobck(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'eliminatipobck/' + bandera, BodyPost);
  }
  eliminaregistbck(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'eliminaregistbck/' + bandera, BodyPost);
  }


  consdetallserv(bandera: string, IdServidor: string) {
    return this.http.get<any[]>(this.url_servidor + 'consdetallserv/' + bandera + '/' + IdServidor);
  }
  updatedetllserv(BodyPost: any) {
    return this.http.put<any>(this.url_servidor + 'updatedetllserv', BodyPost);
  }
  actualizainfousuario(bandera: string, BodyPost: any) {
    return this.http.put<any>(this.url_servidor + 'actualizainfousuario/' + bandera, BodyPost);
  }

  consultservicios(IdProyecto: string, TipoServicio: string, Prioridad: string, NombreSp: string) {
    return this.http.get<any[]>(this.url_servidor + 'consultservicios/' + IdProyecto + '/' + TipoServicio + '/' + Prioridad + '/' + NombreSp);
  }
  public postFileImagen(imagenParaSubir: File) {
    const formData = new FormData();
    formData.append('file', imagenParaSubir, imagenParaSubir.name);
    return this.http.post(this.url_servidor + 'uploadFile', formData);
  }
  insertaservicio(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'insertaservicio/' + bandera, BodyPost);
  }
  modificaimagen(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'modificaimagen/' + bandera, BodyPost);
  }
  consultainfouser(IdUsuario: string) {
    return this.http.get<any[]>(this.url_servidor + 'consultainfouser/' + IdUsuario);
  }
  actualizaservicio(bandera: string, BodyPost: any) {
    return this.http.put<any>(this.url_servidor + 'actualizaservicio/' + bandera, BodyPost);
  }
  eliminaservicio(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'eliminaservicio/' + bandera, BodyPost);
  }
  consdesrrllopendient(IdIntegrador: string, IdProyecto: string) {
    return this.http.get<any[]>(this.url_servidor + 'consdesrrllopendient/' + IdIntegrador + '/' + IdProyecto);
  }
  updateserviciorealizado(bandera: string, BodyPost: any) {
    return this.http.put<any>(this.url_servidor + 'updateserviciorealizado/' + bandera, BodyPost);
  }


  //Roles
  conslistrol(bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'conslistrol/' + bandera);
  }
  conspermisosrol(bandera: string, IdRol: string, NombreRol: string) {
    return this.http.get<any[]>(this.url_servidor + 'conspermisosrol/' + bandera + '/' + IdRol + '/' + NombreRol);
  }
  insertacrolmod(bandera: string, IdUsuario: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'insertacrolmod/' + bandera + '/' + IdUsuario, BodyPost);
  }
  actualizacrolmod(bandera: string, IdUsuario: string, BodyPut: any) {
    return this.http.put<any>(this.url_servidor + 'actualizacrolmod/' + bandera + '/' + IdUsuario, BodyPut);
  }
  actualizacpermisorol(bandera: string, IdUsuario: string, BodyPost: any) {
    return this.http.put<any>(this.url_servidor + 'actualizacpermisorol/' + bandera + '/' + IdUsuario, BodyPost);
  }
  consrolmodulo(IdRol: string, NombreModulo: string) {
    return this.http.get<any[]>(this.url_servidor + 'consrolmodulo/' + IdRol + '/' + NombreModulo);
  }

  //Login
  consusuarioinfoconsola(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'consusuarioinfoconsola/' + bandera, BodyPost);
  }
  //Menu
  consusuarioroles(bandera: string, IdUsuario: string) {
    return this.http.get<any[]>(this.url_servidor + 'consusuarioroles/' + bandera + '/' + IdUsuario);
  }

  //Asignacion Roles Usuario
  conscusuario(bandera: string, IdUsuario: string, Estado: string, IdRol: string, IdUsuarioCons: string, NombreUsuario: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscusuario/' + bandera + '/' + IdUsuario + '/' + Estado + '/' + IdRol + '/' + IdUsuarioCons + '/' + NombreUsuario);
  }
  insertauserolmodifica(bandera: string, IdUsuarioRol: string, IdUsuario: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'insertauserolmodifica/' + bandera + '/' + IdUsuarioRol + '/' + IdUsuario, BodyPost);
  }
  consusuarioconsmod(bandera: string, IdUsuario: string, BodyPost: any) {
    return this.http.put<any>(this.url_servidor + 'consusuarioconsmod/' + bandera + '/' + IdUsuario, BodyPost);
  }
  //Consulta registro Tareas
  consregistrotareas(bandera: string, BodyPost: any) {
    return this.http.post<any>(this.url_servidor + 'consregistrotareas/' + bandera, BodyPost);
  }
  conslistatarea() {
    return this.http.get<any[]>(this.url_servidor + 'conslistatarea');
  }

}
