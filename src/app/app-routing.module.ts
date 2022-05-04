import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgbackupsComponent } from './components/pgbackups/pgbackups.component';
import { PgservidoresComponent } from './components/pgservidores/pgservidores.component';
import { LayautprincipalComponent } from './layouts/layautprincipal/layautprincipal.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutpaginaComponent } from './layouts/layoutpagina/layoutpagina.component';
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


const routes: Routes = [

  {
    path: 'home',
    component: LayoutpaginaComponent,
    children: [
      {
        path: 'PgBackup',
        component: PgbackupsComponent,
      },
      {
        path: 'PgServidores',
        component: PgservidoresComponent,
      },
      {

        path: 'Pgtipobackup',
        component: PgtipobackupComponent,
      },
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'PgUsuarios',
        component: PgusuariosComponent,

      },
      {
        path: 'PgProyectos',
        component: PgproyectosComponent,

      },
      {
        path: 'PgUsuario',
        component: PgusuarioComponent,

      },
      {
        path: 'PgEtb',
        component: PgetbComponent,

      },
      {
        path: 'PgVpn',
        component: PgvpnComponent,

      },
      {
        path: 'PgServicios/:Id',
        component: PgserviciosComponent,

      },
      {
        path: 'consactividades',
        component: ConsactividadesComponent,

      },
      {
        path: 'pgregtroactividades',
        component: PgregtroactividadesComponent,

      },

    ],
  },

  {
    path: '',
    component: LayautprincipalComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserAnimationsModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
