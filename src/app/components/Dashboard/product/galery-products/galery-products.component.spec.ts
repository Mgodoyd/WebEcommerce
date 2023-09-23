import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleryProductsComponent } from './galery-products.component';

describe('GaleryProductsComponent', () => {
  let component: GaleryProductsComponent;
  let fixture: ComponentFixture<GaleryProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleryProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleryProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
