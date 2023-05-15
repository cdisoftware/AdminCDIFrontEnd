import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgaplicacionesComponent } from './pgaplicaciones.component';

describe('PgaplicacionesComponent', () => {
  let component: PgaplicacionesComponent;
  let fixture: ComponentFixture<PgaplicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgaplicacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgaplicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
