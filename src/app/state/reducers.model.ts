import { Entity } from '../models';

export enum AppStateKey {
  ActiveEntity = 'activeEntity',
  ActiveEntityId = 'activeEntityId',
  Errors = 'errors',
  Entities = 'entities',
  MainEntities = 'mainEntities',
  SelectedYear = 'selectedYear',
}

export interface AppState {
  [AppStateKey.ActiveEntity]?: Entity;
  [AppStateKey.ActiveEntityId]: string;
  [AppStateKey.Errors]: unknown[];
  [AppStateKey.Entities]: Entity[];
  [AppStateKey.MainEntities]: Entity[];
  [AppStateKey.SelectedYear]: number;
}
