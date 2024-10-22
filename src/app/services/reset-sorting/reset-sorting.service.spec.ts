import { TestBed } from '@angular/core/testing';

import { ResetSortingService } from './reset-sorting.service';

describe('ResetSortingService', () => {
  let service: ResetSortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetSortingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
