import { Entity } from '../models';

import { AppStateKey } from './reducers.model';

export enum ActionTypes {
  GetActiveEntity = '[Entities] Get Active Entity',
  GetActiveEntityError = '[Entities] Get Active Entity Error',
  GetActiveEntitySuccess = '[Entities] Get Active Entity Success',
  GetEntities = '[Entities] Get Entities By Parent ID',
  GetEntitiesError = '[Entities] Get Entities By Parent ID Error',
  GetEntitiesSuccess = '[Entities] Get Entities By Parent ID Success',
  GetMainEntities = '[Entities] Get Entities By Type',
  GetMainEntitiesError = '[Entities] Get Entities By Type Error',
  GetMainEntitiesSuccess = '[Entities] Get Entities By Type Success',
  SetActiveEntityError = '[Entities] Set Active Entity Error',
  SetActiveEntityId = '[Entities] Set Active Entity ID',
  SetActiveEntitySuccess = '[Entities] Set Active Entity Success',
}

export interface GetActiveEntityProps {
  id: string;
}

export interface GetActiveEntityErrorProps {
  [AppStateKey.Errors]: unknown[];
}

export interface GetActiveEntitySuccessProps {
  [AppStateKey.ActiveEntity]: Entity;
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
