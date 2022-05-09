import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PgservidoresComponent } from './components/pgservidores/pgservidores.component';
import { LayautprincipalComponent } from './layouts/layautprincipal/layautprincipal.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './components/shared/shared.module';
import { PgbackupsComponent } from './components/pgbackups/pgbackups.component';
import { LayoutpaginaComponent } from './layouts/layoutpagina/layoutpagina.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, HashLocationStrategy, LocationStrategy  } from "@angular/common";

import { PgtipobackupComponent } from './components/pgtipobackup/pgtipobackup.component';

import { HomeComponent } from './components/home/home.component';
import { PgusuariosComponent } from './components/pgusuarios/pgusuarios.component';
import { PgproyectosComponent } from './components/pgproyectos/pgproyectos.component';
import { PgusuarioComponent } from './components/pgusuario/pgusuario.component';
import { PgserviciosComponent } from './components/pgservicios/pgservicios.component';
import { PgetbComponent } from './components/pgetb/pgetb.component';
import { PgvpnComponent } from './components/pgvpn/pgvpn.component';
import { ConsactividadesComponent } from './components/consactividades/consactividades.component';
import { PgregtroactividadesComponent } from './components/pgregtroactividades/pgregtroactividades.component';
import { PgrolesComponent } from './components/pgroles/pgroles.component';

@NgModule({
  declarations: [
    AppComponent,
    PgbackupsComponent,
    PgservidoresComponent,
    LayautprincipalComponent,
    LoginComponent,
    LayoutpaginaComponent,
    PgtipobackupComponent,
    HomeComponent,
    PgusuariosComponent,
    PgproyectosComponent,
    PgusuarioComponent,
    PgserviciosComponent,
    PgetbComponent,
    PgvpnComponent,
    ConsactividadesComponent,
    PgregtroactividadesComponent,
    PgrolesComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [{provide : LocationStrategy , useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
