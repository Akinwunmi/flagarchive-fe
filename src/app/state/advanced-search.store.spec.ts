import { TestBed } from '@angular/core/testing';

import { AdvancedSearchStore } from './advanced-search.store';
import { AdvancedSearchStateKey } from './state.model';

describe('AdvancedSearchStore', () => {
  let store: InstanceType<typeof AdvancedSearchStore>;

  beforeEach(() => {
    store = TestBed.inject(AdvancedSearchStore);
  });

  it('should update max year', () => {
    store.updateMaxYear(2025);
    expect(store[AdvancedSearchStateKey.MaxYear]()).toEqual(2025);
  });

  it('should update min year', () => {
    store.updateMinYear(2000);
    expect(store[AdvancedSearchStateKey.MinYear]()).toEqual(2000);
  });
});
