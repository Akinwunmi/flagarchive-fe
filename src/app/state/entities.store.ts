import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { Entity, EntityRange, EntityType } from '../models';
import { EntityService } from '../services';

import { AdvancedSearchStore } from './advanced-search.store';
import { ErrorsStore } from './errors.store';
import { initialState } from './state';
import { AdvancedSearchStateKey, AppStateKey, EntitiesStateKey } from './state.model';

export const EntitiesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState[AppStateKey.Entities]),
  withMethods(
    (
      store,
      advancedSearchStore = inject(AdvancedSearchStore),
      entityService = inject(EntityService),
      errorsStore = inject(ErrorsStore),
    ) => ({
      addEntities: rxMethod<Entity[]>(
        pipe(
          switchMap(entities =>
            entityService.addEntities(entities).pipe(
              tapResponse({
                next: () => {
                  patchState(store, {
                    [EntitiesStateKey.All]: [...store[EntitiesStateKey.All](), ...entities],
                  });
                },
                error: error => errorsStore.addError(error),
              }),
            ),
          ),
        ),
      ),
      getEntities: rxMethod<string>(
        pipe(
          tap(id => patchState(store, { [EntitiesStateKey.SelectedId]: id })),
          switchMap(id =>
            entityService.getEntityById(id).pipe(
              tapResponse({
                next: entity => patchState(store, { [EntitiesStateKey.Selected]: entity }),
                error: error => errorsStore.addError(error),
              }),
            ),
          ),
          switchMap(parentEntity =>
            entityService.getEntitiesByParentId(parentEntity.id).pipe(
              tapResponse({
                next: entities => {
                  patchState(store, { [EntitiesStateKey.Current]: entities });

                  const selectedYear = advancedSearchStore[AdvancedSearchStateKey.SelectedYear];
                  const entityRanges = entities.map(entity => entity.ranges);
                  const [minYear, maxYear] = setYears(entityRanges, parentEntity.ranges);

                  advancedSearchStore.updateMaxYear(maxYear);
                  advancedSearchStore.updateMinYear(minYear);

                  if (selectedYear() < minYear) {
                    advancedSearchStore.updateSelectedYear(minYear);
                  }

                  if (selectedYear() > maxYear) {
                    advancedSearchStore.updateSelectedYear(maxYear);
                  }
                },
                error: error => errorsStore.addError(error),
              }),
            ),
          ),
        ),
      ),
      getMainEntities: rxMethod<void>(
        pipe(
          switchMap(() =>
            entityService.getEntitiesByType([EntityType.Continent, EntityType.Organization]).pipe(
              tapResponse({
                next: entities => patchState(store, { [EntitiesStateKey.Main]: entities }),
                error: error => errorsStore.addError(error),
              }),
            ),
          ),
        ),
      ),
      updateSelectedEntityId(id: string) {
        patchState(store, { [EntitiesStateKey.SelectedId]: id });
      },
    }),
  ),
);

function getLastYear(defaultYear: number, ranges?: EntityRange[]): number {
  return ranges?.slice(-1)[0]?.end ?? defaultYear;
}

function getFirstYear(defaultYear: number, ranges?: EntityRange[]): number {
  return ranges?.[0]?.start ?? defaultYear;
}

function setYears(
  listOfRanges: (EntityRange[] | undefined)[],
  parentRanges?: EntityRange[],
): [number, number] {
  const currentYear = new Date().getFullYear();
  let maxYear = currentYear;
  let minYear = currentYear;

  if (listOfRanges.length) {
    maxYear = Math.max(...listOfRanges.map(ranges => getLastYear(currentYear, ranges)));
    minYear = Math.min(...listOfRanges.map(ranges => getFirstYear(maxYear, ranges)));
  }

  if (maxYear === currentYear && minYear === currentYear) {
    maxYear = getLastYear(currentYear, parentRanges);
    minYear = getFirstYear(maxYear, parentRanges);
  }

  return [minYear, maxYear];
}
