import { createAction, props } from '@ngrx/store';

import {
  ActionTypes,
  GetEntitiesErrorProps,
  GetEntitiesProps,
  GetEntitiesSuccessProps,
  GetMainEntitiesErrorProps,
  GetMainEntitiesProps,
  GetMainEntitiesSuccessProps,
  SetActiveEntityIdProps,
} from './actions.model';

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
