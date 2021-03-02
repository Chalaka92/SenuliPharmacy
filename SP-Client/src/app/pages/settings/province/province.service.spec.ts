/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { ProvinceService } from './province.service';

describe('Service: Province', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProvinceService]
    });
  });

  it('should ...', inject([ProvinceService], (service: ProvinceService) => {
    expect(service).toBeTruthy();
  }));
});
