import { TestBed } from '@angular/core/testing';

import { EntrepriseTableService } from './entreprise-table.service';

describe('EntrepriseTableService', () => {
  let service: EntrepriseTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrepriseTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
