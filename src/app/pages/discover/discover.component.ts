import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { EntityHeaderComponent, MainEntitiesHeaderComponent } from '../../components';
import { EntityType } from '../../models';
import { getMainEntities } from '../../state/actions';
import { selectActiveEntity, selectMainEntities } from '../../state/selectors';
import { map } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, EntityHeaderComponent, MainEntitiesHeaderComponent, RouterOutlet],
  selector: 'app-discover',
  standalone: true,
  styleUrl: './discover.component.scss',
  templateUrl: './discover.component.html',
})
export class DiscoverComponent implements OnInit {
  readonly #store = inject(Store);

  activeEntity$ = this.#store.select(selectActiveEntity);
  mainEntities$ = this.#store.select(selectMainEntities);

  isMainEntity$ = this.activeEntity$.pipe(
    map(entity => entity?.type && Object.values(EntityType).includes(entity.type as EntityType)),
  );

  ngOnInit() {
    this.#store.dispatch(getMainEntities());
  }
}
