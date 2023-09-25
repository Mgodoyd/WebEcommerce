import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexProductStoreComponent } from './index-product-store.component';

describe('IndexProductStoreComponent', () => {
  let component: IndexProductStoreComponent;
  let fixture: ComponentFixture<IndexProductStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexProductStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexProductStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
