import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { MainEntitiesHeaderComponent } from '../../components';
import { selectActiveEntityId, selectMainEntities } from '../../state/selectors';
import { getMainEntities } from '../../state/actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, MainEntitiesHeaderComponent, RouterOutlet],
  selector: 'app-discover',
  standalone: true,
  styleUrl: './discover.component.scss',
  templateUrl: './discover.component.html',
})
export class DiscoverComponent implements OnInit {
  readonly #store = inject(Store);

  activeEntityId$ = this.#store.select(selectActiveEntityId);
  mainEntities$ = this.#store.select(selectMainEntities);

  ngOnInit() {
    this.#store.dispatch(getMainEntities());
  }
}
