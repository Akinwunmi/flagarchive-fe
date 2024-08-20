import { Entity, SortDirection } from '../models';

import { AppStateKey, EntitiesStateKey } from './reducers.model';

export enum ActionTypes {
  GetEntities = '[Entities] Get Entities By Parent ID',
  GetEntitiesError = '[Entities] Get Entities By Parent ID Error',
  GetEntitiesSuccess = '[Entities] Get Entities By Parent ID Success',
  GetMainEntities = '[Entities] Get Entities By Type',
  GetMainEntitiesError = '[Entities] Get Entities By Type Error',
  GetMainEntitiesSuccess = '[Entities] Get Entities By Type Success',
  GetSelectedEntity = '[Entities] Get Selected Entity',
  GetSelectedEntityError = '[Entities] Get Selected Entity Error',
  GetSelectedEntitySuccess = '[Entities] Get Selected Entity Success',
  SetSelectedEntityId = '[Entities] Set Selected Entity ID',
  SetSelectedYear = '[Advanced Search] Set Selected Year',
  SetSortDirection = '[Advanced Search] Set Sort Direction',
}

export interface GetSelectedEntityProps {
  id: string;
}

export interface GetSelectedEntityErrorProps {
  [AppStateKey.Errors]: unknown[];
}

export interface GetSelectedEntitySuccessProps {
  [EntitiesStateKey.Selected]: Entity;
}

export interface GetEntitiesProps {
  id: string;
}

export interface GetEntitiesErrorProps {
  [AppStateKey.Errors]: unknown[];
}

export interface GetEntitiesSuccessProps {
  [AppStateKey.Entities]: Entity[];
}

export interface GetMainEntitiesErrorProps {
  [AppStateKey.Errors]: unknown[];
}

export interface GetMainEntitiesSuccessProps {
  [EntitiesStateKey.Main]: Entity[];
}

export interface SetSelectedEntityIdProps {
  id: string;
}

export interface SetSelectedYearProps {
  year: number;
}

export interface SetSortDirectionProps {
  direction: SortDirection;
}
