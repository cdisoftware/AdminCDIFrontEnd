import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PghardwareComponent } from './pghardware.component';

describe('PghardwareComponent', () => {
  let component: PghardwareComponent;
  let fixture: ComponentFixture<PghardwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PghardwareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PghardwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
