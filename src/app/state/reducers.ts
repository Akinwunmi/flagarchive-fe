import { createReducer, on } from '@ngrx/store';

import { DefaultMainEntity, FlagCategory, Layout, SortDirection } from '../models';

import {
  getEntitiesError,
  getEntitiesSuccess,
  getMainEntitiesError,
  getMainEntitiesSuccess,
  getSelectedEntityError,
  getSelectedEntitySuccess,
  setFlagCategory,
  setLayout,
  setSelectedEntityId,
  setSelectedYear,
  setSortDirection,
} from './actions';
import { AdvancedSearchStateKey, AppState, AppStateKey, EntitiesStateKey } from './reducers.model';

export const initialState: AppState = {
  [AppStateKey.AdvancedSearch]: {
    [AdvancedSearchStateKey.FlagCategory]: FlagCategory.Official,
    [AdvancedSearchStateKey.Layout]: Layout.Grid,
    [AdvancedSearchStateKey.SelectedYear]: new Date().getFullYear(),
    [AdvancedSearchStateKey.SortDirection]: SortDirection.Asc,
  },
  [AppStateKey.Errors]: [],
  [AppStateKey.Entities]: {
    [EntitiesStateKey.All]: [],
    [EntitiesStateKey.Current]: [],
    [EntitiesStateKey.Main]: [],
    [EntitiesStateKey.SelectedId]: DefaultMainEntity.Continents,
  },
};

export const reducer = createReducer(
  initialState,
  on(getSelectedEntityError, (state, { errors }) => ({
    ...state,
    [AppStateKey.Errors]: errors,
  })),
  on(getSelectedEntitySuccess, (state, { selected }) => ({
    ...state,
    [AppStateKey.Entities]: {
      ...state[AppStateKey.Entities],
      [EntitiesStateKey.Selected]: selected,
    },
  })),
  on(getEntitiesError, (state, { errors }) => ({
    ...state,
    [AppStateKey.Errors]: errors,
  })),
  on(getEntitiesSuccess, (state, { entities }) => ({
    ...state,
    [AppStateKey.Entities]: {
      ...state[AppStateKey.Entities],
      [EntitiesStateKey.Current]: entities,
    },
  })),
  on(getMainEntitiesError, (state, { errors }) => ({
    ...state,
    [AppStateKey.Errors]: errors,
  })),
  on(getMainEntitiesSuccess, (state, { main }) => ({
    ...state,
    [AppStateKey.Entities]: {
      ...state[AppStateKey.Entities],
      [EntitiesStateKey.Main]: main,
    },
  })),
  on(setFlagCategory, (state, { category }) => ({
    ...state,
    [AppStateKey.AdvancedSearch]: {
      ...state[AppStateKey.AdvancedSearch],
      [AdvancedSearchStateKey.FlagCategory]: category,
    },
  })),
  on(setLayout, (state, { layout }) => ({
    ...state,
    [AppStateKey.AdvancedSearch]: {
      ...state[AppStateKey.AdvancedSearch],
      [AdvancedSearchStateKey.Layout]: layout,
    },
  })),
  on(setSelectedEntityId, (state, { id }) => ({
    ...state,
    [AppStateKey.Entities]: {
      ...state[AppStateKey.Entities],
      [EntitiesStateKey.SelectedId]: id,
    },
  })),
  on(setSelectedYear, (state, { year }) => ({
    ...state,
    [AppStateKey.AdvancedSearch]: {
      ...state[AppStateKey.AdvancedSearch],
      [AdvancedSearchStateKey.SelectedYear]: year,
    },
  })),
  on(setSortDirection, (state, { direction }) => ({
    ...state,
    [AppStateKey.AdvancedSearch]: {
      ...state[AppStateKey.AdvancedSearch],
      [AdvancedSearchStateKey.SortDirection]: direction,
    },
  })),
);
