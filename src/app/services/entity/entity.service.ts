import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  limit,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Entity } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  readonly #firestore = inject(Firestore);

  #entities = collection(this.#firestore, 'entities');

  getEntitiesByParentId(id: string): Observable<Entity[]> {
    const entities = query(this.#entities, where('parentId', '==', id), limit(60));
    return collectionData(entities, { idField: 'baseId' }) as Observable<Entity[]>;
  }

  getEntitiesByType(types: string[]): Observable<Entity[]> {
    const entities = query(this.#entities, where('type', 'in', types), limit(60));
    return collectionData(entities, { idField: 'baseId' }) as Observable<Entity[]>;
  }
}
