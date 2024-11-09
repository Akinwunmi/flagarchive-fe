import { SortDirection } from '../models';

export function sortBy<T, K extends keyof T>(
  array: T[],
  rawKey: K,
  sortDirection: SortDirection,
): T[] {
  const direction = sortDirection === SortDirection.Desc ? -1 : 1;

  return [...array].sort((a, b) => {
    const aValue = a[rawKey];
    const bValue = b[rawKey];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * direction;
    }

    return aValue > bValue ? direction : aValue < bValue ? -direction : 0;
  });
}
