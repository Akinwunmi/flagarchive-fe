import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FlagButtonDirective,
  FlagCardComponent,
  FlagDropdownDirective,
  FlagIconComponent,
  FlagListItemComponent,
} from '@flagarchive/angular';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { FilterOption, FlagCategory, Layout, SortDirection } from '../../models';
import { setFlagCategory, setLayout, setSortDirection } from '../../state/actions';
import { selectFlagCategory, selectLayout, selectSortDirection } from '../../state/selectors';

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
  readonly #store = inject(Store);

  flagCategory = toSignal(this.#store.select(selectFlagCategory));
  #layout = toSignal(this.#store.select(selectLayout));
  #sortDirection = toSignal(this.#store.select(selectSortDirection));

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

  setFlagCategory(category: FlagCategory) {
    this.#store.dispatch(setFlagCategory({ category }));
  }

  setLayout(layout: Layout) {
    this.#store.dispatch(setLayout({ layout }));
  }

  setSortDirection(direction: SortDirection) {
    this.#store.dispatch(setSortDirection({ direction }));
  }
}
