import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layautprincipal',
  templateUrl: './layautprincipal.component.html',
  styleUrls: ['./layautprincipal.component.css']
})
export class LayautprincipalComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }
  VerPgBackup(){
    this.router.navigate(["home/PgBackup"]);
  }
  VerPgServidores(){
    this.router.navigate(["home/PgServidores"]);
  }
}
