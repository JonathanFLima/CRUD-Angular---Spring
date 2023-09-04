import { TestBed } from '@angular/core/testing';

import { CoursesCrudService } from './courses-crud.service';

describe('CoursesCrudService', () => {
  let service: CoursesCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
