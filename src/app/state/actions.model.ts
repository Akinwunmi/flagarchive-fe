import { Entity } from '../models';

import { AppStateKey } from './reducers.model';

export enum ActionTypes {
  GetEntities = '[Entities] Get Entities By Parent ID',
  GetEntitiesError = '[Entities] Get Entities By Parent ID Error',
  GetEntitiesSuccess = '[Entities] Get Entities By Parent ID Success',
  GetMainEntities = '[Entities] Get Entities By Type',
  GetMainEntitiesError = '[Entities] Get Entities By Type Error',
  GetMainEntitiesSuccess = '[Entities] Get Entities By Type Success',
  SetActiveEntityId = '[Entities] Set Active Entity ID',
}

export interface GetEntitiesProps {
  id: string;
}

export interface SetActiveEntityIdProps {
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
  [AppStateKey.MainEntities]: Entity[];
}
