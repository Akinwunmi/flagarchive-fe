import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { FlagCategory, Layout, SortDirection } from '../../models';
import { initialState } from '../state';
import { AppStateKey, AdvancedSearchStateKey } from '../state.model';

export const AdvancedSearchStore = signalStore(
  { providedIn: 'root' },
  withState(initialState[AppStateKey.AdvancedSearch]),
  withMethods(store => ({
    updateFlagCategory(category: FlagCategory) {
      patchState(store, { [AdvancedSearchStateKey.FlagCategory]: category });
    },
    updateLayout(layout: Layout) {
      patchState(store, { [AdvancedSearchStateKey.Layout]: layout });
    },
    updateMaxYear(year: number) {
      patchState(store, { [AdvancedSearchStateKey.MaxYear]: year });
    },
    updateMinYear(year: number) {
      patchState(store, { [AdvancedSearchStateKey.MinYear]: year });
    },
    updateSelectedYear(year: number) {
      patchState(store, { [AdvancedSearchStateKey.SelectedYear]: year });
    },
    updateSortDirection(direction: SortDirection) {
      patchState(store, { [AdvancedSearchStateKey.SortDirection]: direction });
    },
  })),
);
