import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgusuariosComponent } from './pgusuarios.component';

describe('PgusuariosComponent', () => {
  let component: PgusuariosComponent;
  let fixture: ComponentFixture<PgusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgusuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
