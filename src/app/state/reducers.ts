import { createReducer, on } from '@ngrx/store';

import { DefaultMainEntity } from '../models';

import {
  getActiveEntityError,
  getActiveEntitySuccess,
  getEntitiesError,
  getEntitiesSuccess,
  getMainEntitiesError,
  getMainEntitiesSuccess,
  setActiveEntityId,
  setSelectedYear,
} from './actions';
import { AppState, AppStateKey } from './reducers.model';

export const initialState: AppState = {
  [AppStateKey.ActiveEntity]: undefined,
  [AppStateKey.ActiveEntityId]: DefaultMainEntity.Continents,
  [AppStateKey.Errors]: [],
  [AppStateKey.Entities]: [],
  [AppStateKey.MainEntities]: [],
  [AppStateKey.SelectedYear]: new Date().getFullYear(),
};

export const reducer = createReducer(
  initialState,
  on(getActiveEntityError, (state, { errors }) => ({
    ...state,
    [AppStateKey.Errors]: errors,
  })),
  on(getActiveEntitySuccess, (state, { activeEntity }) => ({
    ...state,
    [AppStateKey.ActiveEntity]: activeEntity,
  })),
  on(getEntitiesError, (state, { errors }) => ({
    ...state,
    [AppStateKey.Errors]: errors,
  })),
  on(getEntitiesSuccess, (state, { entities }) => ({
    ...state,
    [AppStateKey.Entities]: entities,
  })),
  on(getMainEntitiesError, (state, { errors }) => ({
    ...state,
    [AppStateKey.Errors]: errors,
  })),
  on(getMainEntitiesSuccess, (state, { mainEntities }) => ({
    ...state,
    [AppStateKey.MainEntities]: mainEntities,
  })),
  on(setActiveEntityId, (state, { id }) => ({
    ...state,
    [AppStateKey.ActiveEntityId]: id,
  })),
  on(setSelectedYear, (state, { year }) => ({
    ...state,
    [AppStateKey.SelectedYear]: year,
  })),
);
