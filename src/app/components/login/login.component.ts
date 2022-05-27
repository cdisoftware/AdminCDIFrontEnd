import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MetodosGlobalesService } from 'src/app/core/metodosglobales.service';
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
  //Variable img
  ImgPerfil: string;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private Servicios: MetodosGlobalesService,
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
    const Ingreso = {
      "Usuario": this.user,
      "Password": this.passw
    }
    this.Servicios.consusuarioinfoconsola('1', Ingreso).subscribe(respu => {
      if (respu.length > 0 && respu[0] != '"No fue posible ejecutar los datos, verifique el Log para validar la inconsistencia"') {
        this.cookies.set("IdUsuario", respu[0].Id_U);
        this.cookies.set("Nombre", respu[0].Nombre);
        this.cookies.set("Apellido", respu[0].Apellido);
        this.cookies.set("Usuario", respu[0].Usuario);
        this.cookies.set("Password", respu[0].Password);
        this.cookies.set("IdRol", respu[0].IdRol);
        this.fakeLoading();
      } else {
        var Error = '' + respu;
        this.error(Error);
        this.form.reset();
      }
    });
  }

  error(Error: string) {
    if (Error == '"No fue posible ejecutar los datos, verifique el Log para validar la inconsistencia"') {
      this._snackBar.open(
        Error,
        '',
        {
          duration: 10000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    } else if(Error != '"No fue posible ejecutar los datos, verifique el Log para validar la inconsistencia"'){
      this._snackBar.open(
        'El usuario o contraseña son invalidos. Encuentra tu cuenta e inicia sesión, o El usuario no tiene roles asignados por favor comuníquese con el administrador para este le suministré uno.',
        '',
        {
          duration: 10000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    }
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      //lo direccionamos al home
      this.router.navigate(['home']);
    }, 500);
  }
}
