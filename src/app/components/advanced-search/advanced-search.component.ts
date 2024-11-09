import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FlagButtonDirective,
  FlagDropdownDirective,
  FlagIconComponent,
} from '@flagarchive/angular';

import { AdvancedSearchStateKey, AdvancedSearchStore } from '../../state';
import { AdvancedSearchMenuComponent } from '../advanced-search-menu';
import { FlagCategoriesButtonComponent } from '../flag-categories-button';
import { YearNavigatorComponent } from '../year-navigator';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AdvancedSearchMenuComponent,
    FlagButtonDirective,
    FlagCategoriesButtonComponent,
    FlagDropdownDirective,
    FlagIconComponent,
    YearNavigatorComponent,
  ],
  selector: 'app-advanced-search',
  standalone: true,
  styleUrl: './advanced-search.component.css',
  templateUrl: './advanced-search.component.html',
})
export class AdvancedSearchComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);

  maxYear = this.#advancedSearchStore[AdvancedSearchStateKey.MaxYear];
  minYear = this.#advancedSearchStore[AdvancedSearchStateKey.MinYear];
}
