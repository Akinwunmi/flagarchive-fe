import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { EntityType } from '../models';
import { EntityService } from '../services';

import {
  getSelectedEntity,
  getSelectedEntityError,
  getSelectedEntitySuccess,
  getEntities,
  getEntitiesError,
  getEntitiesSuccess,
  getMainEntities,
  getMainEntitiesError,
  getMainEntitiesSuccess,
  setSelectedEntityId,
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

  getSelectedEntity$ = createEffect(() => this.#actions$.pipe(
    ofType(getSelectedEntity),
    switchMap(({ id }) => this.#entityService.getEntityById(id).pipe(
      map(selected => getSelectedEntitySuccess({ selected })),
      catchError(error => of(getSelectedEntityError(this.#setError(error)))),
    )),
  ));

  getEntities$ = createEffect(() => this.#actions$.pipe(
    ofType(getEntities),
    tap(({ id }) => {
      this.#store.dispatch(setSelectedEntityId({ id }));
      this.#store.dispatch(getSelectedEntity({ id }));
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
      map(main => getMainEntitiesSuccess({ main })),
      catchError(error => of(getMainEntitiesError(this.#setError(error)))),
    )),
  ));

  #setError(error: unknown): Pick<AppState, AppStateKey.Errors> {
    return { errors: [...initialState[AppStateKey.Errors], error] };
  }
}
