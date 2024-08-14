import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  limit,
  query,
  where,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

import { Entity } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  readonly #firestore = inject(Firestore);

  #entities = collection(this.#firestore, 'entities');

  getEntityById(id: string): Observable<Entity> {
    const entities = query(this.#entities, where('id', '==', id), limit(1));
    const entities$ = collectionData(entities, { idField: 'baseId' }) as Observable<Entity[]>;

    return entities$.pipe(
      map(entities => entities[0]),
    );
  }

  getEntitiesByParentId(id: string): Observable<Entity[]> {
    const entities = query(this.#entities, where('parentId', '==', id), limit(60));
    return collectionData(entities, { idField: 'baseId' }) as Observable<Entity[]>;
  }

  getEntitiesByType(types: string[]): Observable<Entity[]> {
    const entities = query(this.#entities, where('type', 'in', types), limit(60));
    return collectionData(entities, { idField: 'baseId' }) as Observable<Entity[]>;
  }
}
