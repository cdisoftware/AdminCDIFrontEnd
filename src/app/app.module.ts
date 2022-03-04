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

import { PgtipobackupComponent } from './components/pgtipobackup/pgtipobackup.component';

import { HomeComponent } from './components/home/home.component';
import { PgusuariosComponent } from './components/pgusuarios/pgusuarios.component';
import { PgproyectosComponent } from './components/pgproyectos/pgproyectos.component';
import { PgusuarioComponent } from './components/pgusuario/pgusuario.component';
import { PgserviciosComponent } from './components/pgservicios/pgservicios.component';

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
    PgserviciosComponent
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
