import { TestBed } from '@angular/core/testing';

import { IntArrayDateAdapterService } from './int-array-date-adapter.service';

describe('StringArrayDateAdapterService', () => {
  let service: IntArrayDateAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntArrayDateAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
