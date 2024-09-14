import { Entity, FlagCategory, Layout, SortDirection } from '../models';

export enum AppStateKey {
  AdvancedSearch = 'advancedSearch',
  Entities = 'entities',
  Errors = 'errors',
}

export enum AdvancedSearchStateKey {
  FlagCategory = 'flagCategory',
  Layout = 'layout',
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
  [AdvancedSearchStateKey.FlagCategory]: FlagCategory;
  [AdvancedSearchStateKey.Layout]: Layout;
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
