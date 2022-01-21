import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayautprincipalComponent } from './layautprincipal.component';

describe('LayautprincipalComponent', () => {
  let component: LayautprincipalComponent;
  let fixture: ComponentFixture<LayautprincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayautprincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayautprincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
