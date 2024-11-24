import { FlagCategory } from './advanced-search.model';

export interface Entity {
  baseId: string;
  id: string;
  translationKey: string;
  type: string;
  altId?: string;
  altParentId?: string;
  flags?: Record<FlagCategory, EntityFlag>;
  parentId?: string;
  ranges?: EntityRange[];
}

export interface EntityFlag {
  ranges?: EntityFlagRange[];
  url: string;
}

export enum EntityType {
  Continent = 'continent',
  Organization = 'organization',
}

interface EntityStartEnd {
  start: number;
  end?: number;
}

export interface EntityFlagRange extends EntityStartEnd {
  url?: string;
}

export interface EntityRange extends EntityStartEnd {
  altParentId?: string;
  parentId?: string;
  translationKey?: string;
  type?: string;
}

export type EntityFullRange = EntityFlagRange & EntityRange;

export type EntityWithoutBaseId = Omit<Entity, 'baseId'>;
