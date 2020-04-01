import { TestBed } from '@angular/core/testing';

import { VorlesungenService } from './vorlesungen.service';

describe('VorlesungenService', () => {
  let service: VorlesungenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VorlesungenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
