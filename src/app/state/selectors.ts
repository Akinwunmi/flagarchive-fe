import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from './reducers.model';

export const state = createFeatureSelector<AppState>('app');
export const selectActiveEntity = createSelector(state, (state: AppState) => state?.activeEntity);
export const selectActiveEntityId = createSelector(
  state,
  (state: AppState) => state?.activeEntityId,
);
export const selectEntities = createSelector(state, (state: AppState) => state?.entities);
export const selectEntitiesError = createSelector(state, (state: AppState) => state?.errors);
export const selectMainEntities = createSelector(state, (state: AppState) => state?.mainEntities);
