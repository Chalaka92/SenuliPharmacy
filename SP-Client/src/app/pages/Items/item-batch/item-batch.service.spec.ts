/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ItemBatchService } from './item-batch.service';

describe('Service: ItemBatch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemBatchService]
    });
  });

  it('should ...', inject([ItemBatchService], (service: ItemBatchService) => {
    expect(service).toBeTruthy();
  }));
});
