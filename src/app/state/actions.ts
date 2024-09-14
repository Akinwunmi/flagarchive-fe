import { createAction, props } from '@ngrx/store';

import {
  ActionTypes,
  GetEntitiesErrorProps,
  GetEntitiesProps,
  GetEntitiesSuccessProps,
  GetMainEntitiesErrorProps,
  GetMainEntitiesSuccessProps,
  GetSelectedEntityErrorProps,
  GetSelectedEntityProps,
  GetSelectedEntitySuccessProps,
  SetFlagCategoryProps,
  SetLayoutProps,
  SetSelectedEntityIdProps,
  SetSelectedYearProps,
  SetSortDirectionProps,
} from './actions.model';

export const getEntities = createAction(ActionTypes.GetEntities, props<GetEntitiesProps>());

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

export const getSelectedEntity = createAction(
  ActionTypes.GetSelectedEntity,
  props<GetSelectedEntityProps>(),
);

export const getSelectedEntityError = createAction(
  ActionTypes.GetSelectedEntityError,
  props<GetSelectedEntityErrorProps>(),
);

export const getSelectedEntitySuccess = createAction(
  ActionTypes.GetSelectedEntitySuccess,
  props<GetSelectedEntitySuccessProps>(),
);

export const setFlagCategory = createAction(
  ActionTypes.SetFlagCategory,
  props<SetFlagCategoryProps>(),
);

export const setLayout = createAction(ActionTypes.SetLayout, props<SetLayoutProps>());

export const setSelectedEntityId = createAction(
  ActionTypes.SetSelectedEntityId,
  props<SetSelectedEntityIdProps>(),
);

export const setSelectedYear = createAction(
  ActionTypes.SetSelectedYear,
  props<SetSelectedYearProps>(),
);

export const setSortDirection = createAction(
  ActionTypes.SetSortDirection,
  props<SetSortDirectionProps>(),
);
