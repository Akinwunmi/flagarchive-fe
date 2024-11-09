import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlagSkeletonComponent } from '@flagarchive/angular';

import {
  AdvancedSearchComponent,
  EntityHeaderComponent,
  MainEntitiesHeaderComponent,
} from '../../components';
import { EntityType } from '../../models';
import { EntitiesStateKey, EntitiesStore } from '../../state';

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
  readonly #entitiesStore = inject(EntitiesStore);

  mainEntities = this.#entitiesStore[EntitiesStateKey.Main];
  selectedEntity = this.#entitiesStore[EntitiesStateKey.Selected];

  isMainEntity = computed(() => {
    const selectedEntity = this.selectedEntity();
    return (
      selectedEntity?.type && Object.values(EntityType).includes(selectedEntity.type as EntityType)
    );
  });

  ngOnInit() {
    this.#entitiesStore.getMainEntities();
  }
}
