import { Entity, SortDirection } from '../models';

export enum AppStateKey {
  AdvancedSearch = 'advancedSearch',
  Entities = 'entities',
  Errors = 'errors',
}

export enum AdvancedSearchStateKey {
  SelectedYear = 'selectedYear',
  SortDirection = 'sortDirection',
}

export enum EntitiesStateKey {
  All = 'all',
  Current = 'current',
  Main = 'main',
  Selected = 'selected',
  SelectedId = 'selectedId',
}

export interface AppState {
  [AppStateKey.AdvancedSearch]: AdvancedSearchState;
  [AppStateKey.Entities]: EntitiesState;
  [AppStateKey.Errors]: unknown[];
}

export interface AdvancedSearchState {
  [AdvancedSearchStateKey.SelectedYear]: number;
  [AdvancedSearchStateKey.SortDirection]: SortDirection;
}

export interface EntitiesState {
  [EntitiesStateKey.All]: Entity[];
  [EntitiesStateKey.Current]: Entity[];
  [EntitiesStateKey.Main]: Entity[];
  [EntitiesStateKey.Selected]?: Entity;
  [EntitiesStateKey.SelectedId]: string;
}
