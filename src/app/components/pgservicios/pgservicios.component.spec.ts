import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgserviciosComponent } from './pgservicios.component';

describe('PgserviciosComponent', () => {
  let component: PgserviciosComponent;
  let fixture: ComponentFixture<PgserviciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgserviciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgserviciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
