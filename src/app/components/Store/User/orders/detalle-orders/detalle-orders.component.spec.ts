import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleOrdersComponent } from './detalle-orders.component';

describe('DetalleOrdersComponent', () => {
  let component: DetalleOrdersComponent;
  let fixture: ComponentFixture<DetalleOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
