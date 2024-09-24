import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FlagButtonDirective,
  FlagDropdownDirective,
  FlagIconComponent,
} from '@flagarchive/angular';

import { AdvancedSearchMenuComponent } from '../advanced-search-menu';
import { YearNavigatorComponent } from '../year-navigator';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AdvancedSearchMenuComponent,
    FlagButtonDirective,
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
  isMenuOpen = signal(false);

  setMenuOpen(): void {
    this.isMenuOpen.set(true);
  }
}
