import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlagSkeletonComponent } from '@flagarchive/angular';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import {
  AdvancedSearchComponent,
  EntityHeaderComponent,
  MainEntitiesHeaderComponent,
} from '../../components';
import { EntityType } from '../../models';
import { getMainEntities } from '../../state/actions';
import { selectEntity, selectMainEntities } from '../../state/selectors';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AdvancedSearchComponent,
    AsyncPipe,
    EntityHeaderComponent,
    FlagSkeletonComponent,
    MainEntitiesHeaderComponent,
    RouterOutlet,
  ],
  selector: 'app-discover',
  standalone: true,
  styleUrl: './discover.component.css',
  templateUrl: './discover.component.html',
})
export class DiscoverComponent implements OnInit {
  readonly #store = inject(Store);

  selectedEntity$ = this.#store.select(selectEntity);
  mainEntities$ = this.#store.select(selectMainEntities);

  isMainEntity$ = this.selectedEntity$.pipe(
    map(entity => entity?.type && Object.values(EntityType).includes(entity.type as EntityType)),
  );

  ngOnInit() {
    this.#store.dispatch(getMainEntities());
  }
}
