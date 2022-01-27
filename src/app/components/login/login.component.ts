import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LayautprincipalComponent } from 'src/app/layouts/layautprincipal/layautprincipal.component';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  // variable usuario login
  user: string;
  // variable contraseña login
  passw: string;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private layautPrincipal: LayautprincipalComponent,
    private _modalService: BsModalService,
    private Servicios: MetodosGlobalesService,
    private modalServiceDos: NgbModal,
    private cookies: CookieService
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ingresar() {
    const consultalogin = {
      Usuario: this.user,
      Password: this.passw,
      RESPUESTA: '0',
    };
    this.Servicios.consultavalidlogin(consultalogin).subscribe((respu) => {
      console.log(respu);
      if (respu =='"El usuario o contraseña son invalidos. Encuentra tu cuenta e inicia sesion"') {
        this.error();
        this.form.reset();
      }else{
        this.fakeLoading();
      }
    });
  }

  error() {
    this._snackBar.open(
      'El usuario o contraseña son invalidos. Encuentra tu cuenta e inicia sesión.',
      '',
      {
        duration: 10000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      }
    );
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      //lo direccionamos al home
      this.router.navigate(['home/PgBackup']);
    }, 500);
  }
}
