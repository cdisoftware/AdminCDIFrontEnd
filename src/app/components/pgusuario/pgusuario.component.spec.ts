import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgusuarioComponent } from './pgusuario.component';

describe('PgusuarioComponent', () => {
  let component: PgusuarioComponent;
  let fixture: ComponentFixture<PgusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
