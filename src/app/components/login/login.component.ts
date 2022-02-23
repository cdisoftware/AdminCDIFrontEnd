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
  user: string = '';
  // variable contraseña login
  passw: string = '';

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

  elem: any;

  ngOnInit(): void {
    this.elem = document.documentElement;
  }

  ingresar() {
    const consultalogin = {
      Usuario: this.user,
      Password: this.passw,
      RESPUESTA: '0',
    };
    this.Servicios.consultavalidlogin(consultalogin).subscribe(respu => {
      if (respu == '"El usuario o contraseña son invalidos. Encuentra tu cuenta e inicia sesion"' || respu.length == 0) {
        this.error();
        this.form.reset();
      } else {
        this.cookies.set("IdUsuario", respu[0].Id_U);
        this.cookies.set("Nombre", respu[0].Nombre);
        this.cookies.set("Apellido", respu[0].Apellido);
        this.cookies.set("UserAdmin", respu[0].UserAdmin);
        this.cookies.set("Usuario", respu[0].Usuario);
        this.cookies.set("Password", respu[0].Password);
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
      this.router.navigate(['home']);
    }, 500);
  }
}
