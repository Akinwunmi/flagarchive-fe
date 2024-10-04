import { ENTITIES_STUB } from '../mocks/entity.mock';
import { SortDirection } from '../models';
import { sortBy } from './advanced-search.util';

describe('AdvancedSearchUtil', () => {
  it('should sort entities by translationKey in descending order', () => {
    const sortedList = sortBy(ENTITIES_STUB, 'translationKey', SortDirection.Desc);
    expect(sortedList[0].translationKey).toBe('republic_of_the_congo');
  });

  it('should sort entities by translationKey in ascending order', () => {
    const sortedList = sortBy(ENTITIES_STUB, 'translationKey', SortDirection.Asc);
    expect(sortedList[0].translationKey).toBe('comoros');
  });
});
