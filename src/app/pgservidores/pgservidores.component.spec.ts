import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgservidoresComponent } from './pgservidores.component';

describe('PgservidoresComponent', () => {
  let component: PgservidoresComponent;
  let fixture: ComponentFixture<PgservidoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgservidoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgservidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
