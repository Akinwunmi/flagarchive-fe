import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FlagButtonDirective,
  FlagDropdownDirective,
  FlagIconComponent,
} from '@flagarchive/angular';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import { selectMaxYear, selectMinYear } from '../../state/selectors';
import { AdvancedSearchMenuComponent } from '../advanced-search-menu';
import { YearNavigatorComponent } from '../year-navigator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class AdvancedSearchComponent implements OnInit {
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #destroyRef = inject(DestroyRef);
  readonly #store = inject(Store);

  isMenuOpen = signal(false);

  maxYear!: number;
  minYear!: number;

  ngOnInit() {
    combineLatest([this.#store.select(selectMaxYear), this.#store.select(selectMinYear)])
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(([maxYear, minYear]) => {
        this.maxYear = maxYear;
        this.minYear = minYear;
        this.#cdr.markForCheck();
      });
  }

  setMenuOpen() {
    this.isMenuOpen.set(true);
  }
}
