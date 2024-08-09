import { AppState, AppStateKey } from './reducers.model';

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

export interface GetMainEntitiesProps {
  types: string[];
}

export interface SetActiveEntityIdProps {
  id: string;
}

export interface GetEntitiesErrorProps extends Pick<AppState, AppStateKey.Errors> {}

export interface GetEntitiesSuccessProps  extends Pick<AppState, AppStateKey.Entities> {}

export interface GetMainEntitiesErrorProps extends Pick<AppState, AppStateKey.Errors> {}

export interface GetMainEntitiesSuccessProps  extends Pick<AppState, AppStateKey.MainEntities> {}
