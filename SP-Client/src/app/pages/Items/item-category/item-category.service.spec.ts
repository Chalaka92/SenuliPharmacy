/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ItemCategoryService } from './item-category.service';

describe('Service: ItemCategory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemCategoryService]
    });
  });

  it('should ...', inject([ItemCategoryService], (service: ItemCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
