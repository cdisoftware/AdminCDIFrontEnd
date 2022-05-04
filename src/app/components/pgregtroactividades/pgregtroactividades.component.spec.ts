import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgregtroactividadesComponent } from './pgregtroactividades.component';

describe('PgregtroactividadesComponent', () => {
  let component: PgregtroactividadesComponent;
  let fixture: ComponentFixture<PgregtroactividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgregtroactividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgregtroactividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
