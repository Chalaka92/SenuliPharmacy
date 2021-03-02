/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderItemBatchService } from './order-item-batch.service';

describe('Service: OrderItemBatch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderItemBatchService]
    });
  });

  it('should ...', inject([OrderItemBatchService], (service: OrderItemBatchService) => {
    expect(service).toBeTruthy();
  }));
});
