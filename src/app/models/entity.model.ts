export interface Entity {
  baseId: string;
  id: string;
  translationKey: string;
  type: string;
  altId?: string;
  altParentId?: string;
  imageUrl?: string;
  parentId?: string;
  ranges?: EntityRange[];
}

export enum EntityType {
  Continent = 'continent',
  Organization = 'organization',
}

export interface EntityRange {
  start: number;
  altParentId?: string;
  end?: number;
  imageUrl?: string;
  parentId?: string;
  translationKey?: string;
}

export type EntityWithoutBaseId = Omit<Entity, 'baseId'>;
