import { FlagCategory } from './advanced-search.model';

export interface Entity {
  baseId: string;
  id: string;
  translationKey: string;
  type: string;
  altId?: string;
  altParentId?: string;
  imageUrl?: string;
  flags?: Record<FlagCategory, EntityFlag>;
  parentId?: string;
  ranges?: EntityRange[];
}

export interface EntityFlag {
  url: string;
}

export enum EntityType {
  Continent = 'continent',
  Organization = 'organization',
}

export interface EntityRange {
  start: number;
  altParentId?: string;
  end?: number;
  flags?: Record<FlagCategory, EntityFlag>;
  imageUrl?: string;
  parentId?: string;
  translationKey?: string;
  type?: string;
}

export type EntityWithoutBaseId = Omit<Entity, 'baseId'>;
