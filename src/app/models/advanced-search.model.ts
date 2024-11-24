export enum FlagCategory {
  CivilEnsign = 'civil_ensign',
  NavalEnsign = 'naval_ensign',
  NavalJack = 'naval_jack',
  Official = 'official',
  PresidentialStandard = 'presidential_standard',
  RoyalStandard = 'royal_standard',
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
