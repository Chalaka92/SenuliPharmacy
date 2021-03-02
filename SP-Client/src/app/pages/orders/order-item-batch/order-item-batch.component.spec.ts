import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemBatchComponent } from './order-item-batch.component';

describe('OrderItemBatchComponent', () => {
  let component: OrderItemBatchComponent;
  let fixture: ComponentFixture<OrderItemBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderItemBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
