import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { initialState } from './state';
import { AppStateKey, ErrorsStateKey } from './state.model';

export const ErrorsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState[AppStateKey.Errors]),
  withMethods(store => ({
    addError(error: unknown) {
      patchState(store, state => ({
        [ErrorsStateKey.All]: { ...state[ErrorsStateKey.All], error },
      }));
    },
  })),
);
