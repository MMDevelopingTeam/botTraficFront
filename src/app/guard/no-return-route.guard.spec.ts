import { TestBed } from '@angular/core/testing';

import { NoReturnRouteGuard } from './no-return-route.guard';

describe('NoReturnRouteGuard', () => {
  let guard: NoReturnRouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoReturnRouteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
