import { signalStore, withState } from '@ngrx/signals';
import { createReducer, on } from '@ngrx/store';

import { DefaultMainEntity, FlagCategory, Layout, SortDirection } from '../models';

import {
  addEntitiesError,
  addEntitiesSuccess,
  getEntitiesError,
  getEntitiesSuccess,
  getMainEntitiesError,
  getMainEntitiesSuccess,
  getSelectedEntityError,
  getSelectedEntitySuccess,
  setFlagCategory,
  setLayout,
  setMaxYear,
  setMinYear,
  setSelectedEntityId,
  setSelectedYear,
  setSortDirection,
} from './actions';
import { AdvancedSearchStateKey, AppState, AppStateKey, EntitiesStateKey } from './reducers.model';

const currentYear = new Date().getFullYear();

export const initialState: AppState = {
  [AppStateKey.AdvancedSearch]: {
    [AdvancedSearchStateKey.FlagCategory]: FlagCategory.Official,
    [AdvancedSearchStateKey.Layout]: Layout.Grid,
    [AdvancedSearchStateKey.MaxYear]: currentYear,
    [AdvancedSearchStateKey.MinYear]: currentYear,
    [AdvancedSearchStateKey.SelectedYear]: currentYear,
    [AdvancedSearchStateKey.SortDirection]: SortDirection.Asc,
  },
  [AppStateKey.Entities]: {
    [EntitiesStateKey.All]: [],
    [EntitiesStateKey.Current]: [],
    [EntitiesStateKey.Main]: [],
    [EntitiesStateKey.SelectedId]: DefaultMainEntity.Continents,
  },
  [AppStateKey.Errors]: [],
};

// TODO - Research how to use the signalStore properly
export const AdvancedSearchStore = signalStore(withState(initialState[AppStateKey.AdvancedSearch]));
export const EntitiesStore = signalStore(withState(initialState[AppStateKey.Entities]));
export const ErrorsStore = signalStore(withState(initialState[AppStateKey.Errors]));

export const reducer = createReducer(
  initialState,
  on(addEntitiesError, (state, { errors }) => ({
    ...state,
    [AppStateKey.Errors]: errors,
  })),
  on(addEntitiesSuccess, (state, { entities }) => ({
    ...state,
    [AppStateKey.Entities]: {
      ...state[AppStateKey.Entities],
      [EntitiesStateKey.All]: [...state[AppStateKey.Entities][EntitiesStateKey.All], ...entities],
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
  on(setMaxYear, (state, { year }) => ({
    ...state,
    [AppStateKey.AdvancedSearch]: {
      ...state[AppStateKey.AdvancedSearch],
      [AdvancedSearchStateKey.MaxYear]: year,
    },
  })),
  on(setMinYear, (state, { year }) => ({
    ...state,
    [AppStateKey.AdvancedSearch]: {
      ...state[AppStateKey.AdvancedSearch],
      [AdvancedSearchStateKey.MinYear]: year,
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
