import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgbackupsComponent } from './components/pgbackups/pgbackups.component';
import { LayautprincipalComponent } from './layouts/layautprincipal/layautprincipal.component';
import { LoginComponent } from './components/login/login.component';
import { LayautloginComponent } from './layouts/layautlogin/layautlogin.component';
const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LayautloginComponent},
 // {path: 'dashboard', loadChildren:() => import('./components/pgbackups').then(x => x.DashboardModule)},
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
