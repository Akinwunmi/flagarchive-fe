import { SortDirection } from '../models';

export function sortBy<T>(array: T[], rawKey: unknown, sortDirection: SortDirection): T[] {
  if (sortDirection === SortDirection.Desc) {
    return [...array].sort((a, b) => {
      const key = rawKey as keyof T;
      if (a[key] > b[key]) {
        return -1;
      }
      if (a[key] < b[key]) {
        return 1;
      }
      return 0;
    });
  }
  return [...array].sort((a, b) => {
    const key = rawKey as keyof T;
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
}
