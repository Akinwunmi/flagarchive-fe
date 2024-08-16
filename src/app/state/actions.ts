import { createAction, props } from '@ngrx/store';

import {
  ActionTypes,
  GetActiveEntityErrorProps,
  GetActiveEntityProps,
  GetActiveEntitySuccessProps,
  GetEntitiesErrorProps,
  GetEntitiesProps,
  GetEntitiesSuccessProps,
  GetMainEntitiesErrorProps,
  GetMainEntitiesSuccessProps,
  SetActiveEntityIdProps,
} from './actions.model';

export const getActiveEntity = createAction(
  ActionTypes.GetActiveEntity,
  props<GetActiveEntityProps>(),
);

export const getActiveEntityError = createAction(
  ActionTypes.GetActiveEntityError,
  props<GetActiveEntityErrorProps>(),
);

export const getActiveEntitySuccess = createAction(
  ActionTypes.GetActiveEntitySuccess,
  props<GetActiveEntitySuccessProps>(),
);

export const getEntities = createAction(
  ActionTypes.GetEntities,
  props<GetEntitiesProps>(),
);

export const getEntitiesError = createAction(
  ActionTypes.GetEntitiesError,
  props<GetEntitiesErrorProps>(),
);

export const getEntitiesSuccess = createAction(
  ActionTypes.GetEntitiesSuccess,
  props<GetEntitiesSuccessProps>(),
);

export const getMainEntities = createAction(ActionTypes.GetMainEntities);

export const getMainEntitiesError = createAction(
  ActionTypes.GetMainEntitiesError,
  props<GetMainEntitiesErrorProps>(),
);

export const getMainEntitiesSuccess = createAction(
  ActionTypes.GetMainEntitiesSuccess,
  props<GetMainEntitiesSuccessProps>(),
);

export const setActiveEntityId = createAction(
  ActionTypes.SetActiveEntityId,
  props<SetActiveEntityIdProps>(),
);

export const setSelectedYear = createAction(
  ActionTypes.SetSelectedYear,
  props<{ year: number }>(),
);
