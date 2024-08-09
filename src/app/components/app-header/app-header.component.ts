import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FlagIconComponent, FlagPillComponent, PillType } from '@flagarchive/angular';
import { Store } from '@ngrx/store';
import { setActiveEntityId } from '../../state/actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FlagIconComponent, FlagPillComponent],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {
  readonly #router = inject(Router);
  readonly #store = inject(Store);

  pillType = PillType;

  goToHome() {
    const id = 'af';

    this.#store.dispatch(setActiveEntityId({ id }));
    this.#router.navigate(['discover', 'entity', id]);
  }
}
