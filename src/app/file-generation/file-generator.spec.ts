import { TestBed } from '@angular/core/testing';

import { FileGenerator } from './file-generator';

describe('FileGenerator', () => {
  let service: FileGenerator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileGenerator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
