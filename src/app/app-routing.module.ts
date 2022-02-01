import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgbackupsComponent } from './components/pgbackups/pgbackups.component';
import { PgservidoresComponent } from './components/pgservidores/pgservidores.component';
import { LayautprincipalComponent } from './layouts/layautprincipal/layautprincipal.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutpaginaComponent } from './layouts/layoutpagina/layoutpagina.component';
import { PgtipobackupComponent } from './components/pgtipobackup/pgtipobackup.component';

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
      }
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
export class AppRoutingModule {}
