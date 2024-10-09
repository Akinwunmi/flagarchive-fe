import { FlagCategory, Layout, SortDirection, Entity } from '../models';

export enum AppStateKey {
  AdvancedSearch = 'advancedSearch',
  Entities = 'entities',
  Errors = 'errors',
}

export enum AdvancedSearchStateKey {
  FlagCategory = 'flagCategory',
  Layout = 'layout',
  MaxYear = 'maxYear',
  MinYear = 'minYear',
  SelectedYear = 'selectedYear',
  SortDirection = 'sortDirection',
}

export enum EntitiesStateKey {
  All = 'all',
  Current = 'current',
  FilteredEntities = 'filteredEntities',
  Main = 'main',
  Selected = 'selected',
  SelectedId = 'selectedId',
}

export enum ErrorsStateKey {
  All = 'all',
}

export interface AppState {
  [AppStateKey.AdvancedSearch]: AdvancedSearchState;
  [AppStateKey.Entities]: EntitiesState;
  [AppStateKey.Errors]: ErrorsState;
}

export interface AdvancedSearchState {
  [AdvancedSearchStateKey.FlagCategory]: FlagCategory;
  [AdvancedSearchStateKey.Layout]: Layout;
  [AdvancedSearchStateKey.MaxYear]: number;
  [AdvancedSearchStateKey.MinYear]: number;
  [AdvancedSearchStateKey.SelectedYear]: number;
  [AdvancedSearchStateKey.SortDirection]: SortDirection;
}

export interface EntitiesState {
  [EntitiesStateKey.All]: Entity[];
  [EntitiesStateKey.Current]: Entity[];
  [EntitiesStateKey.Main]: Entity[];
  [EntitiesStateKey.Selected]: Entity | undefined;
  [EntitiesStateKey.SelectedId]: string;
}

export interface ErrorsState {
  [ErrorsStateKey.All]: unknown[];
}
