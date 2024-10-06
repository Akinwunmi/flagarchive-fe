import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  FlagButtonDirective,
  FlagCardComponent,
  FlagDropdownDirective,
  FlagIconComponent,
  FlagListItemComponent,
} from '@flagarchive/angular';
import { TranslateModule } from '@ngx-translate/core';

import { FilterOption, FlagCategory, Layout, SortDirection } from '../../models';
import { AdvancedSearchStateKey, AdvancedSearchStore } from '../../state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlagButtonDirective,
    FlagCardComponent,
    FlagDropdownDirective,
    FlagIconComponent,
    FlagListItemComponent,
    TranslateModule,
  ],
  selector: 'app-advanced-search-menu',
  standalone: true,
  styleUrl: './advanced-search-menu.component.css',
  templateUrl: './advanced-search-menu.component.html',
})
export class AdvancedSearchMenuComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);

  flagCategory = this.#advancedSearchStore[AdvancedSearchStateKey.FlagCategory];
  #layout = this.#advancedSearchStore[AdvancedSearchStateKey.Layout];
  #sortDirection = this.#advancedSearchStore[AdvancedSearchStateKey.SortDirection];

  flagCategoryOptions = computed<FilterOption<FlagCategory>[]>(() =>
    Object.values(FlagCategory)
      .map(value => ({
        active: this.flagCategory() === value,
        label: 'ADVANCED_SEARCH.FLAG_CATEGORY.' + value.toUpperCase(),
        value,
      }))
      .reverse(),
  );

  layoutOptions = computed<FilterOption<Layout>[]>(() =>
    Object.values(Layout)
      .map(value => ({
        active: this.#layout() === value,
        icon: value === Layout.Grid ? 'grid_view' : 'splitscreen',
        value,
      }))
      .reverse(),
  );

  sortOptions = computed<FilterOption<SortDirection>[]>(() =>
    Object.values(SortDirection).map(value => ({
      active: this.#sortDirection() === value,
      label: 'ADVANCED_SEARCH.SORTING.NAME.' + value.toUpperCase(),
      value,
    })),
  );

  getSelectedFlagCategoryLabel(): string {
    return (
      this.flagCategoryOptions().find(option => option.active)?.label ?? 'COMMON.FLAG_CATEGORIES'
    );
  }

  updateFlagCategory(category: FlagCategory) {
    this.#advancedSearchStore.updateFlagCategory(category);
  }

  updateLayout(layout: Layout) {
    this.#advancedSearchStore.updateLayout(layout);
  }

  updateSortDirection(direction: SortDirection) {
    this.#advancedSearchStore.updateSortDirection(direction);
  }
}
