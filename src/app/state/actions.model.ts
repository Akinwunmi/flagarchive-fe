import { Entity, FlagCategory, Layout, SortDirection } from '../models';

import { AppStateKey, EntitiesStateKey } from './reducers.model';

export enum ActionTypes {
  AddEntities = '[Entities] Add Entities',
  AddEntitiesError = '[Entities] Add Entities Error',
  AddEntitiesSuccess = '[Entities] Add Entities Success',
  GetEntities = '[Entities] Get Entities By Parent ID',
  GetEntitiesError = '[Entities] Get Entities By Parent ID Error',
  GetEntitiesSuccess = '[Entities] Get Entities By Parent ID Success',
  GetMainEntities = '[Entities] Get Entities By Type',
  GetMainEntitiesError = '[Entities] Get Entities By Type Error',
  GetMainEntitiesSuccess = '[Entities] Get Entities By Type Success',
  GetSelectedEntity = '[Entities] Get Selected Entity',
  GetSelectedEntityError = '[Entities] Get Selected Entity Error',
  GetSelectedEntitySuccess = '[Entities] Get Selected Entity Success',
  SetFlagCategory = '[Advanced Search] Set Flag Category',
  SetLayout = '[Advanced Search] Set Layout',
  SetMaxYear = '[Advanced Search] Set Max Year',
  SetMinYear = '[Advanced Search] Set Min Year',
  SetSelectedEntityId = '[Entities] Set Selected Entity ID',
  SetSelectedYear = '[Advanced Search] Set Selected Year',
  SetSortDirection = '[Advanced Search] Set Sort Direction',
}

export interface AddEntitiesProps {
  [AppStateKey.Entities]: Entity[];
}

export interface AddEntitiesErrorProps {
  [AppStateKey.Errors]: unknown[];
}

export interface AddEntitiesSuccessProps {
  [AppStateKey.Entities]: Entity[];
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

export interface SetFlagCategoryProps {
  category: FlagCategory;
}

export interface SetLayoutProps {
  layout: Layout;
}

export interface SetMaxYearProps {
  year: number;
}

export interface SetMinYearProps {
  year: number;
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
