import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FlagButtonDirective,
  FlagCardComponent,
  FlagDropdownDirective,
  FlagIconComponent,
  FlagListItemComponent,
} from '@flagarchive/angular';
import { Store } from '@ngrx/store';

import { SortDirection, SortOption } from '../../models';
import { setSortDirection } from '../../state/actions';
import { selectSortDirection } from '../../state/selectors';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlagButtonDirective,
    FlagCardComponent,
    FlagDropdownDirective,
    FlagIconComponent,
    FlagListItemComponent,
  ],
  selector: 'app-advanced-search',
  standalone: true,
  styleUrl: './advanced-search.component.scss',
  templateUrl: './advanced-search.component.html',
})
export class AdvancedSearchComponent {
  readonly #store = inject(Store);
  
  #sortDirection = toSignal(this.#store.select(selectSortDirection));

  isMenuOpen = signal(false);

  sortOptions = computed<SortOption[]>(() => Object.values(SortDirection).map(direction => ({
    active: this.#sortDirection() === direction,
    direction,
    label: `Name ${direction === SortDirection.Asc ? 'A-Z' : 'Z-A'}`,
  })));

  setMenuOpen(): void {
    this.isMenuOpen.set(true);
  }

  setSortDirection(direction: SortDirection): void {
    this.#store.dispatch(setSortDirection({ direction }));
  }
}
