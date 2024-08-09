import { Entity } from '../models';

export enum AppStateKey {
  ActiveEntityId = 'activeEntityId',
  Errors = 'errors',
  Entities = 'entities',
  MainEntities = 'mainEntities',
}

export interface AppState {
  [AppStateKey.ActiveEntityId]: string;
  [AppStateKey.Errors]: unknown[];
  [AppStateKey.Entities]: Entity[];
  [AppStateKey.MainEntities]: Entity[];
}
