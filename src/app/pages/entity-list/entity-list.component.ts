import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { EntityComponent } from '../../components';
import { Entity } from '../../models';
import {
  AdvancedSearchStateKey,
  AdvancedSearchStore,
  EntitiesStateKey,
  EntitiesStore,
} from '../../state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EntityComponent, NgClass],
  selector: 'app-entity-list',
  standalone: true,
  styleUrl: './entity-list.component.css',
  templateUrl: './entity-list.component.html',
})
export class EntityListComponent implements OnInit {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #destroyRef = inject(DestroyRef);
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);

  entities = this.#entitiesStore[EntitiesStateKey.FilteredEntities];
  sortDirection = this.#advancedSearchStore[AdvancedSearchStateKey.SortDirection];

  #selectedEntityId = this.#entitiesStore[EntitiesStateKey.SelectedId];

  ngOnInit() {
    const id = this.#router.url.split('/').pop();
    this.#getEntities(id);

    this.#router.events.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
      const id = this.#router.url.split('/').pop();
      if (id !== this.#selectedEntityId()) {
        this.#getEntities(id);
      }
      this.#cdr.markForCheck();
    });
  }

  getEntitiesAndNavigate(entity: Entity) {
    const id = entity.altId?.startsWith(this.#selectedEntityId()) ? entity.altId : entity.id;

    this.#getEntities(id);
    this.#router.navigate(['..', id], { relativeTo: this.#route });
  }

  #getEntities(id?: string) {
    if (id) {
      this.#entitiesStore.getEntities(id);
    }
  }
}
