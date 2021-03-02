/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpService } from './sp.service';

describe('Service: User', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpService],
    });
  });

  it('should ...', inject([SpService], (service: SpService) => {
    expect(service).toBeTruthy();
  }));
});
