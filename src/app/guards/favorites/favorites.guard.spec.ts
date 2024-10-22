import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { favoritesGuard } from './favorites.guard';

describe('favoritesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => favoritesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
