import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { StateService } from './state.service';

describe('StateService', () => {
  let service: StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(StateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
