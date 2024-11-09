import { DefaultMainEntity, FlagCategory, Layout, SortDirection } from '../models';

import {
  AdvancedSearchStateKey,
  AppState,
  AppStateKey,
  EntitiesStateKey,
  ErrorsStateKey,
} from './state.model';

const currentYear = new Date().getFullYear();

export const initialState: AppState = {
  [AppStateKey.AdvancedSearch]: {
    [AdvancedSearchStateKey.FlagCategory]: FlagCategory.Official,
    [AdvancedSearchStateKey.Layout]: Layout.Grid,
    [AdvancedSearchStateKey.MaxYear]: currentYear,
    [AdvancedSearchStateKey.MinYear]: currentYear,
    [AdvancedSearchStateKey.SelectedYear]: currentYear,
    [AdvancedSearchStateKey.SortDirection]: SortDirection.Asc,
  },
  [AppStateKey.Entities]: {
    [EntitiesStateKey.All]: [],
    [EntitiesStateKey.Current]: [],
    [EntitiesStateKey.FoundEntity]: undefined,
    [EntitiesStateKey.Main]: [],
    [EntitiesStateKey.SelectedId]: DefaultMainEntity.Continents,
  },
  [AppStateKey.Errors]: {
    [ErrorsStateKey.All]: [],
  },
};
