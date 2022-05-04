import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsactividadesComponent } from './consactividades.component';

describe('ConsactividadesComponent', () => {
  let component: ConsactividadesComponent;
  let fixture: ComponentFixture<ConsactividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsactividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsactividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
