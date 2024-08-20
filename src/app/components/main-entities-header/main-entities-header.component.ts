import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  HostListener,
  OnInit,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FlagIconComponent } from '@flagarchive/angular';
import { Store } from '@ngrx/store';
import { filter, map, startWith } from 'rxjs';

import { DefaultMainEntity, DiscoverSection, Entity, EntityType } from '../../models';
import { setSelectedEntityId } from '../../state/actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlagIconComponent, NgClass, NgTemplateOutlet],
  selector: 'app-main-entities-header',
  standalone: true,
  styleUrl: './main-entities-header.component.scss',
  templateUrl: './main-entities-header.component.html',
})
export class MainEntitiesHeaderComponent implements OnInit {
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #destroyRef = inject(DestroyRef);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #store = inject(Store);

  mainEntities = input.required<Entity[]>();

  activeMainEntityId = signal<string>(DefaultMainEntity.Continents);

  continents = computed(() => this.#getEntities(EntityType.Continent));
  organizations = computed(() => this.#getEntities(EntityType.Organization));

  activeSection = computed(() => this.activeMainEntityId().startsWith('o')
    ? DiscoverSection.Organizations
    : DiscoverSection.Continents,
  );

  defaultMainEntity = DefaultMainEntity;
  discoverSection = DiscoverSection;
  
  isMobile = window.innerWidth < 640;
  
  @HostListener('window:resize')
  onWindowResize() {
    this.isMobile = window.innerWidth < 640;
  }

  ngOnInit() {
    const initialId = this.#router.url.split('/').pop();
    this.#router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event.url.split('/').pop()),
      startWith(initialId),
      takeUntilDestroyed(this.#destroyRef),
    ).subscribe(id => {
      if (id && id !== this.activeMainEntityId()) {
        this.activeMainEntityId.set(id);
      }
      this.#cdr.markForCheck();
    });
  }

  setActiveMainEntity(id: string) {
    this.activeMainEntityId.set(id);
    this.#store.dispatch(setSelectedEntityId({ id: id }));
    this.#router.navigate(['entity', id], { relativeTo: this.#route });
  }

  #getEntities(type: EntityType): Entity[] {
    return this.mainEntities().filter(entity => entity.type === type);
  }
}
