import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { FlagCategory, Layout, SortDirection } from '../../models';
import { initialState } from '../state';

export const AdvancedSearchStore = signalStore(
  { providedIn: 'root' },
  withState(initialState.advancedSearch),
  withMethods(store => ({
    updateFlagCategory(flagCategory: FlagCategory) {
      patchState(store, { flagCategory });
    },
    updateLayout(layout: Layout) {
      patchState(store, { layout });
    },
    updateMaxYear(maxYear: number) {
      patchState(store, { maxYear });
    },
    updateMinYear(minYear: number) {
      patchState(store, { minYear });
    },
    updateSelectedYear(selectedYear: number) {
      patchState(store, { selectedYear });
    },
    updateSortDirection(sortDirection: SortDirection) {
      patchState(store, { sortDirection });
    },
  })),
);
