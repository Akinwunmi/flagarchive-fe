export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export interface SortOption {
  active: boolean;
  direction: SortDirection;
  label: string;
}
