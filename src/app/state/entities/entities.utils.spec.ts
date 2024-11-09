import { signal } from '@angular/core';

import { ENTITIES_STUB } from '../../mocks';
import { AdvancedSearchStore } from '../advanced-search';

import { setFilteredEntities } from './entities.utils';
import { SortDirection } from '../../models';

describe('EntitiesUtils', () => {
  const advancedSearchStore = {
    minYear: signal(2000),
    maxYear: signal(2024),
    selectedYear: signal(2020),
    sortDirection: signal(SortDirection.Asc),
  } as unknown as InstanceType<typeof AdvancedSearchStore>;

  it('should set filtered entities', () => {
    const entities = ENTITIES_STUB;
    const filteredEntities = setFilteredEntities(entities, advancedSearchStore);

    expect(filteredEntities.length).toBe(entities.length);
  });
});
