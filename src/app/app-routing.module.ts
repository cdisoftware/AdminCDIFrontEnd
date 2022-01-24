import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgbackupsComponent } from './components/pgbackups/pgbackups.component';
import { PgservidoresComponent } from './components/pgservidores/pgservidores.component';
import { LayautprincipalComponent } from './layouts/layautprincipal/layautprincipal.component';
import { LayautloginComponent } from './layouts/layautlogin/layautlogin.component';
const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LayautloginComponent},
 {path: 'home/PgBackup', loadChildren:() => import('./components/pgbackups/pgbackups.component').then(x => x.PgbackupsComponent)},
  {path: '**', redirectTo: 'login', pathMatch: 'full'},

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
