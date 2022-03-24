import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgvpnComponent } from './pgvpn.component';

describe('PgvpnComponent', () => {
  let component: PgvpnComponent;
  let fixture: ComponentFixture<PgvpnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgvpnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgvpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
