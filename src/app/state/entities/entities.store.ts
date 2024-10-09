import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { Entity, EntityType } from '../../models';
import { EntityService } from '../../services';
import { AdvancedSearchStore } from '../advanced-search';
import { ErrorsStore } from '../errors';
import { initialState } from '../state';
import { AppStateKey, EntitiesStateKey } from '../state.model';

import { setFilteredEntities, setYears } from './entities.utils';

export const EntitiesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState[AppStateKey.Entities]),
  withComputed((store, advancedSearchStore = inject(AdvancedSearchStore)) => ({
    [EntitiesStateKey.FilteredEntities]: computed(() =>
      setFilteredEntities(store[EntitiesStateKey.Current](), advancedSearchStore),
    ),
  })),
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
                  setYears(entities, parentEntity, advancedSearchStore);
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
