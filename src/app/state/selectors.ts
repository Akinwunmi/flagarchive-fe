import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AdvancedSearchStateKey, AppState, AppStateKey, EntitiesStateKey } from './reducers.model';

export const state = createFeatureSelector<AppState>('app');
export const selectEntity = createSelector(
  state,
  (state: AppState) => state?.[AppStateKey.Entities]?.[EntitiesStateKey.Selected],
);
export const selectEntityId = createSelector(
  state,
  (state: AppState) => state?.[AppStateKey.Entities]?.[EntitiesStateKey.SelectedId],
);
export const selectEntities = createSelector(
  state,
  (state: AppState) => state?.[AppStateKey.Entities]?.[EntitiesStateKey.Current],
);
export const selectEntitiesError = createSelector(
  state,
  (state: AppState) => state?.[AppStateKey.Errors],
);
export const selectMainEntities = createSelector(
  state,
  (state: AppState) => state?.[AppStateKey.Entities]?.[EntitiesStateKey.Main],
);
export const selectYear = createSelector(
  state,
  (state: AppState) => state?.[AppStateKey.AdvancedSearch]?.[AdvancedSearchStateKey.SelectedYear],
);
export const selectSortDirection = createSelector(
  state,
  (state: AppState) => state?.[AppStateKey.AdvancedSearch]?.[AdvancedSearchStateKey.SortDirection],
);
