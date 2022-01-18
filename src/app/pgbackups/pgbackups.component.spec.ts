import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgbackupsComponent } from './pgbackups.component';

describe('PgbackupsComponent', () => {
  let component: PgbackupsComponent;
  let fixture: ComponentFixture<PgbackupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgbackupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgbackupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
