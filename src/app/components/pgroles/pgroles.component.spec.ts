import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgrolesComponent } from './pgroles.component';

describe('PgrolesComponent', () => {
  let component: PgrolesComponent;
  let fixture: ComponentFixture<PgrolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgrolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
