import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlagIconComponent } from '@flagarchive/angular';
import { Store } from '@ngrx/store';

import { DefaultMainEntity, DiscoverSection, Entity, EntityType } from '../../models';
import { setActiveEntityId } from '../../state/actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlagIconComponent, NgClass, NgTemplateOutlet],
  selector: 'app-main-entities-header',
  standalone: true,
  styleUrl: './main-entities-header.component.scss',
  templateUrl: './main-entities-header.component.html',
})
export class MainEntitiesHeaderComponent implements OnInit {
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #store = inject(Store);

  mainEntities = input.required<Entity[]>();

  activeMainEntityId = signal<string>(DefaultMainEntity.Continents);

  continents = computed(() => this.mainEntities()?.filter(entity =>
    entity.type === EntityType.Continent,
  ));
  organizations = computed(() => this.mainEntities()?.filter(entity =>
    entity.type === EntityType.Organization,
  ));

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
    const id = this.#router.url.split('/').pop();
    if (id) {
      this.activeMainEntityId.set(id);
    }
  }

  setActiveMainEntity(id: string) {
    this.activeMainEntityId.set(id);
    this.#store.dispatch(setActiveEntityId({ id: id }));
    this.#router.navigate(['entity', id], { relativeTo: this.#route });
  }
}
