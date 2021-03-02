/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { DistrictService } from './district.service';

describe('Service: District', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistrictService]
    });
  });

  it('should ...', inject([DistrictService], (service: DistrictService) => {
    expect(service).toBeTruthy();
  }));
});
