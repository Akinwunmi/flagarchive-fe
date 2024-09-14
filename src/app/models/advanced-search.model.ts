export enum FlagCategory {
  Civil = 'civil',
  DeFacto = 'de_facto',
  DeJure = 'de_jure',
  Naval = 'naval',
  Official = 'official',
}

export enum Layout {
  Grid = 'grid',
  List = 'list',
}

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export interface FilterOption<T> {
  active: boolean;
  icon?: string;
  label?: string;
  value: T;
}
