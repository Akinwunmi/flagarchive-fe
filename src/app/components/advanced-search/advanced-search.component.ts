import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FlagButtonDirective,
  FlagDropdownDirective,
  FlagIconComponent,
} from '@flagarchive/angular';

import { AdvancedSearchStore } from '../../state';
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
  styleUrl: './advanced-search.component.css',
  templateUrl: './advanced-search.component.html',
})
export class AdvancedSearchComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);

  maxYear = this.#advancedSearchStore.maxYear;
  minYear = this.#advancedSearchStore.minYear;
}
