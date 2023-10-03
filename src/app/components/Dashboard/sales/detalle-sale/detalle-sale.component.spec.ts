import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSaleComponent } from './detalle-sale.component';

describe('DetalleSaleComponent', () => {
  let component: DetalleSaleComponent;
  let fixture: ComponentFixture<DetalleSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
