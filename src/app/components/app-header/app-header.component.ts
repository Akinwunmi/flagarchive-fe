import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FlagButtonDirective,
  FlagIconComponent,
  FlagPillComponent,
  PillType,
} from '@flagarchive/angular';
import { Store } from '@ngrx/store';

import { setSelectedEntityId } from '../../state/actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlagButtonDirective, FlagIconComponent, FlagPillComponent],
  selector: 'app-header',
  standalone: true,
  styleUrl: './app-header.component.scss',
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent {
  readonly #router = inject(Router);
  readonly #store = inject(Store);

  pillType = PillType;

  goToHome() {
    const id = 'af';

    this.#store.dispatch(setSelectedEntityId({ id }));
    this.#router.navigate(['discover', 'entity', id]);
  }
}
