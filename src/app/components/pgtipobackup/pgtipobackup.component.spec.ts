import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgtipobackupComponent } from './pgtipobackup.component';

describe('PgtipobackupComponent', () => {
  let component: PgtipobackupComponent;
  let fixture: ComponentFixture<PgtipobackupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgtipobackupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgtipobackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
