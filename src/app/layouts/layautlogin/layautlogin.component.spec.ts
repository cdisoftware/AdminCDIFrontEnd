import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayautloginComponent } from './layautlogin.component';

describe('LayautloginComponent', () => {
  let component: LayautloginComponent;
  let fixture: ComponentFixture<LayautloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayautloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayautloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
