import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PgbackupsComponent } from './components/pgbackups/pgbackups.component';
import { HttpClientModule } from '@angular/common/http';
import { PgservidoresComponent } from './components/pgservidores/pgservidores.component';
import { LayautprincipalComponent } from './layouts/layautprincipal/layautprincipal.component';
import { LayautloginComponent } from './layouts/layautlogin/layautlogin.component';

@NgModule({
  declarations: [
    AppComponent,
    PgbackupsComponent,
    PgservidoresComponent,
    LayautprincipalComponent,
    LayautloginComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
