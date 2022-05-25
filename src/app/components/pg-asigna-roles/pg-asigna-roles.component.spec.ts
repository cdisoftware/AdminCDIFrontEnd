import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgAsignaRolesComponent } from './pg-asigna-roles.component';

describe('PgAsignaRolesComponent', () => {
  let component: PgAsignaRolesComponent;
  let fixture: ComponentFixture<PgAsignaRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgAsignaRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgAsignaRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
