import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { EntityType } from '../models';
import { EntityService } from '../services';

import {
  getActiveEntity,
  getActiveEntityError,
  getActiveEntitySuccess,
  getEntities,
  getEntitiesError,
  getEntitiesSuccess,
  getMainEntities,
  getMainEntitiesError,
  getMainEntitiesSuccess,
  setActiveEntityId,
} from './actions';
import { initialState } from './reducers';
import { AppState, AppStateKey } from './reducers.model';

@Injectable({
  providedIn: 'root'
})
export class EntityEffects {
  readonly #actions$ = inject(Actions);
  readonly #entityService = inject(EntityService);
  readonly #store = inject(Store);

  getActiveEntity$ = createEffect(() => this.#actions$.pipe(
    ofType(getActiveEntity),
    switchMap(({ id }) => this.#entityService.getEntityById(id).pipe(
      map(activeEntity => getActiveEntitySuccess({ activeEntity })),
      catchError(error => of(getActiveEntityError(this.#setError(error)))),
    )),
  ));

  getEntities$ = createEffect(() => this.#actions$.pipe(
    ofType(getEntities),
    tap(({ id }) => {
      this.#store.dispatch(setActiveEntityId({ id }));
      this.#store.dispatch(getActiveEntity({ id }));
    }),
    switchMap(({ id }) => this.#entityService.getEntitiesByParentId(id).pipe(
      map(entities => getEntitiesSuccess({ entities })),
      catchError(error => of(getEntitiesError(this.#setError(error)))),
    )),
  ));

  getMainEntities$ = createEffect(() => this.#actions$.pipe(
    ofType(getMainEntities),
    switchMap(() => this.#entityService.getEntitiesByType([
      EntityType.Continent,
      EntityType.Organization,
    ]).pipe(
      map(mainEntities => getMainEntitiesSuccess({ mainEntities })),
      catchError(error => of(getMainEntitiesError(this.#setError(error)))),
    )),
  ));

  #setError(error: unknown): Pick<AppState, AppStateKey.Errors> {
    return { errors: [...initialState[AppStateKey.Errors], error] };
  }
}
