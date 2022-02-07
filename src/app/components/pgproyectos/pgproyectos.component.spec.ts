import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgproyectosComponent } from './pgproyectos.component';

describe('PgproyectosComponent', () => {
  let component: PgproyectosComponent;
  let fixture: ComponentFixture<PgproyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgproyectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgproyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
