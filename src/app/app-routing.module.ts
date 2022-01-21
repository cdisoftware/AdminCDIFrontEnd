import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgbackupsComponent } from './components/pgbackups/pgbackups.component';
import { LayautprincipalComponent } from './layouts/layautprincipal/layautprincipal.component';

const routes: Routes = [
  /*{
    path: '',
    component: LayoutPrincipalComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      }
    ]
  },*/
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