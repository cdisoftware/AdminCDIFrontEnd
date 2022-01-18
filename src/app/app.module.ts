import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PgbackupsComponent } from './pgbackups/pgbackups.component';
import { HttpClientModule } from '@angular/common/http';
import { PgservidoresComponent } from './pgservidores/pgservidores.component';

@NgModule({
  declarations: [
    AppComponent,
    PgbackupsComponent,
    PgservidoresComponent
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
export class AppModule { }
