import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgetbComponent } from './pgetb.component';

describe('PgetbComponent', () => {
  let component: PgetbComponent;
  let fixture: ComponentFixture<PgetbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgetbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgetbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
