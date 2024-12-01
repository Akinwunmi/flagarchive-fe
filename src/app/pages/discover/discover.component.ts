import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlagSkeletonComponent } from '@flagarchive/angular';

import {
  AdvancedSearchComponent,
  EntityHeaderComponent,
  MainEntitiesHeaderComponent,
} from '../../components';
import { EntityType } from '../../models';
import { EntitiesStore } from '../../state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AdvancedSearchComponent,
    EntityHeaderComponent,
    FlagSkeletonComponent,
    MainEntitiesHeaderComponent,
    RouterOutlet,
  ],
  selector: 'app-discover',
  styleUrl: './discover.component.css',
  templateUrl: './discover.component.html',
})
export class DiscoverComponent implements OnInit {
  readonly #entitiesStore = inject(EntitiesStore);

  mainEntities = this.#entitiesStore.main;
  selected = this.#entitiesStore.selected;

  isMainEntity = computed(() => {
    const selected = this.selected();
    return (
      selected?.entity.type &&
      Object.values(EntityType).includes(selected.entity.type as EntityType)
    );
  });

  ngOnInit() {
    this.#entitiesStore.getMainEntities();
  }
}
