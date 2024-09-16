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
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import { EntityComponent } from '../../components';
import { Entity } from '../../models';
import { getEntities } from '../../state/actions';
import { selectEntities, selectEntityId, selectSortDirection } from '../../state/selectors';
import { sortBy } from '../../utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EntityComponent, NgClass],
  selector: 'app-entity-list',
  standalone: true,
  styleUrl: './entity-list.component.css',
  templateUrl: './entity-list.component.html',
})
export class EntityListComponent implements OnInit {
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #destroyRef = inject(DestroyRef);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #store = inject(Store);

  entities!: Entity[];

  #selectedEntityId!: string;

  ngOnInit() {
    const id = this.#router.url.split('/').pop();
    this.#getEntities(id);
    this.#setEntityIdAndEntities();

    this.#router.events.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
      const id = this.#router.url.split('/').pop();
      if (id !== this.#selectedEntityId) {
        this.#getEntities(id);
      }
      this.#cdr.markForCheck();
    });
  }

  getEntitiesAndNavigate(entity: Entity) {
    const id = entity.altId?.startsWith(this.#selectedEntityId) ? entity.altId : entity.id;

    this.#getEntities(id);
    this.#router.navigate(['..', id], { relativeTo: this.#route });
  }

  #getEntities(id?: string) {
    if (id) {
      this.#store.dispatch(getEntities({ id }));
    }
  }

  #setEntityIdAndEntities() {
    combineLatest([
      this.#store.select(selectEntityId),
      this.#store.select(selectEntities),
      this.#store.select(selectSortDirection),
    ])
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(([id, entities, sortDirection]) => {
        this.#selectedEntityId = id;
        this.entities = sortBy<Entity>(entities, 'translationKey', sortDirection) ?? [];
        this.#cdr.markForCheck();
      });
  }
}
