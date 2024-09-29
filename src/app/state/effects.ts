import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, map, of, switchMap, tap } from 'rxjs';

import { Entity, EntityRange, EntityType } from '../models';
import { EntityService } from '../services';

import {
  addEntities,
  addEntitiesError,
  addEntitiesSuccess,
  getEntities,
  getEntitiesError,
  getEntitiesSuccess,
  getMainEntities,
  getMainEntitiesError,
  getMainEntitiesSuccess,
  getSelectedEntity,
  getSelectedEntityError,
  setSelectedEntityId,
  getSelectedEntitySuccess,
  setMaxYear,
  setMinYear,
  setSelectedYear,
} from './actions';
import { initialState } from './reducers';
import { AppState, AppStateKey } from './reducers.model';
import { selectEntity, selectYear } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class EntityEffects {
  readonly #actions$ = inject(Actions);
  readonly #entityService = inject(EntityService);
  readonly #store = inject(Store);

  addEntities$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(addEntities),
      switchMap(({ entities }) =>
        this.#entityService.addEntities(entities).pipe(
          map(() => addEntitiesSuccess({ entities })),
          catchError(error => of(addEntitiesError(this.#setError(error)))),
        ),
      ),
    ),
  );

  getEntities$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(getEntities),
      tap(({ id }) => {
        this.#store.dispatch(setSelectedEntityId({ id }));
        this.#store.dispatch(getSelectedEntity({ id }));
      }),
      switchMap(({ id }) =>
        this.#entityService.getEntitiesByParentId(id).pipe(
          switchMap(entities =>
            combineLatest([this.#store.select(selectEntity), this.#store.select(selectYear)]).pipe(
              map(([parentEntity, selectedYear]) => {
                if (parentEntity?.id === id) {
                  this.#setYears(entities, selectedYear, parentEntity);
                }
                return entities;
              }),
            ),
          ),
          map(entities => {
            return getEntitiesSuccess({ entities });
          }),
          catchError(error => of(getEntitiesError(this.#setError(error)))),
        ),
      ),
    ),
  );

  getMainEntities$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(getMainEntities),
      switchMap(() =>
        this.#entityService.getEntitiesByType([EntityType.Continent, EntityType.Organization]).pipe(
          map(main => getMainEntitiesSuccess({ main })),
          catchError(error => of(getMainEntitiesError(this.#setError(error)))),
        ),
      ),
    ),
  );

  getSelectedEntity$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(getSelectedEntity),
      switchMap(({ id }) =>
        this.#entityService.getEntityById(id).pipe(
          map(selected => getSelectedEntitySuccess({ selected })),
          catchError(error => of(getSelectedEntityError(this.#setError(error)))),
        ),
      ),
    ),
  );

  #getLastYear(defaultYear: number, ranges?: EntityRange[]): number {
    return ranges?.slice(-1)[0]?.end ?? defaultYear;
  }

  #getFirstYear(defaultYear: number, ranges?: EntityRange[]): number {
    return ranges?.[0]?.start ?? defaultYear;
  }

  #setYears(entities: Entity[], selectedYear: number, parentEntity?: Entity) {
    const entityRanges = entities.map(entity => entity.ranges);
    const currentYear = new Date().getFullYear();
    let maxYear = currentYear;
    let minYear = currentYear;

    if (entityRanges.length) {
      maxYear = Math.max(...entityRanges.map(ranges => this.#getLastYear(currentYear, ranges)));
      minYear = Math.min(...entityRanges.map(ranges => this.#getFirstYear(maxYear, ranges)));
    }

    if (maxYear === currentYear && minYear === currentYear) {
      maxYear = this.#getLastYear(currentYear, parentEntity?.ranges);
      minYear = this.#getFirstYear(maxYear, parentEntity?.ranges);
    }

    this.#store.dispatch(setMaxYear({ year: maxYear }));
    this.#store.dispatch(setMinYear({ year: minYear }));

    if (selectedYear < minYear) {
      this.#store.dispatch(setSelectedYear({ year: minYear }));
    }

    if (selectedYear > maxYear) {
      this.#store.dispatch(setSelectedYear({ year: maxYear }));
    }
  }

  #setError(error: unknown): Pick<AppState, AppStateKey.Errors> {
    return { errors: [...initialState[AppStateKey.Errors], error] };
  }
}
