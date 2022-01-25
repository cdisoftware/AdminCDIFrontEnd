import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgbackupsComponent } from './components/pgbackups/pgbackups.component';
import { PgservidoresComponent } from './components/pgservidores/pgservidores.component';
import { LayautprincipalComponent } from './layouts/layautprincipal/layautprincipal.component';
import { LayautloginComponent } from './layouts/layautlogin/layautlogin.component';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
  /*{
    path: '',
    component: LayautloginComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      }
    ]
  },
*/
  {
    path: 'home',
    component: LayautprincipalComponent,
    children: [
      {
        path: 'PgBackup',
        component: PgbackupsComponent,
      }
    ]
  },

  {
    path: 'home',
    component: LayautprincipalComponent,
    children: [
      {
        path: 'PgServidores',
        component: PgservidoresComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
