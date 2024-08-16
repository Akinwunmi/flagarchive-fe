import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FlagButtonDirective,
  FlagDropdownDirective,
  FlagIconComponent,
  FlagYearPickerComponent,
} from '@flagarchive/angular';
import { Store } from '@ngrx/store';
import { interval, map, Subject, takeUntil } from 'rxjs';

import { setSelectedYear } from '../../state/actions';
import { selectSelectedYear } from '../../state/selectors';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlagButtonDirective,
    FlagDropdownDirective,
    FlagIconComponent,
    FlagYearPickerComponent,
    NgClass,
  ],
  selector: 'app-year-navigator',
  standalone: true,
  styleUrl: './year-navigator.component.scss',
  templateUrl: './year-navigator.component.html',
})
export class YearNavigatorComponent implements OnDestroy, OnInit {
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #destroyRef = inject(DestroyRef);
  readonly #store = inject(Store);

  max = input(new Date().getFullYear());
  min = input(0);

  #isPlayingBackward = signal(false);
  #isPlayingForward = signal(false);

  isPlaying = computed(() => this.#isPlayingBackward() || this.#isPlayingForward());

  dropdownIsOpen = false;
  selectedYear = 0;

  #stop$ = new Subject<void>();
  #playSpeed$ = interval(750);

  ngOnInit() {
    this.#store.select(selectSelectedYear).pipe(
      map(selectedYear => selectedYear),
      takeUntilDestroyed(this.#destroyRef),
    ).subscribe(selectedYear => {
      this.selectedYear = Math.min(this.max(), selectedYear);
      this.#cdr.markForCheck();
    });
  }

  ngOnDestroy() {
    this.#stop$.next();
    this.#stop$.complete();
  }

  previous() {
    this.setSelectedYear(this.selectedYear - 1);
    this.stop();
  }

  next() {
    this.setSelectedYear(this.selectedYear + 1);
    this.stop();
  }

  play(backward?: boolean) {
    this.#isPlayingBackward.set(!!backward);
    this.#isPlayingForward.set(!backward);
    this.#playSpeed$.pipe(
      takeUntil(this.#stop$),
    ).subscribe(() => {
      const maxReached = this.#isPlayingForward() && this.max() === this.selectedYear;
      const minReached = this.#isPlayingBackward() && this.min() === this.selectedYear;
      if (maxReached || minReached) {
        this.stop();
      }
      this.setSelectedYear(
        this.#isPlayingBackward() ? this.selectedYear - 1 : this.selectedYear + 1,
      );
    });
  }

  stop() {
    this.#stop$.next();
    this.#isPlayingBackward.set(false);
    this.#isPlayingForward.set(false);
  }

  setDropdownState() {
    this.dropdownIsOpen = true;
    this.stop();
  }

  setSelectedYear(year: number) {
    this.#store.dispatch(setSelectedYear({ year }));
    this.dropdownIsOpen = false;
  }
}
