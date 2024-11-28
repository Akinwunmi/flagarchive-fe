import { NgTemplateOutlet } from '@angular/common';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FlagIconComponent } from '@flagarchive/angular';
import { TranslateModule } from '@ngx-translate/core';
import { filter, map, startWith } from 'rxjs';

import { DefaultMainEntity, DiscoverSection, Entity, EntityType } from '../../models';
import { TranslationKeyPipe } from '../../pipes';
import { EntitiesStore } from '../../state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlagIconComponent, NgTemplateOutlet, TranslateModule, TranslationKeyPipe],
  selector: 'app-main-entities-header',
  standalone: true,
  styleUrl: './main-entities-header.component.css',
  templateUrl: './main-entities-header.component.html',
})
export class MainEntitiesHeaderComponent implements OnInit {
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #destroyRef = inject(DestroyRef);
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);

  mainEntities = input.required<Entity[]>();

  selectedMainEntityId = signal<string>(DefaultMainEntity.Continents);

  continents = computed(() => this.#getEntities(EntityType.Continent));
  organizations = computed(() => this.#getEntities(EntityType.Organization));

  activeSection = computed(() =>
    this.selectedMainEntityId().startsWith('o')
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
    this.#router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => event.url.split('/').pop()),
        startWith(initialId),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe(id => {
        if (id && id !== this.selectedMainEntityId()) {
          this.selectedMainEntityId.set(id);
        }
        this.#cdr.markForCheck();
      });
  }

  selectMainEntity(id: string) {
    this.selectedMainEntityId.set(id);
    this.#entitiesStore.updateSelectedEntityId(id);
    this.#router.navigate(['entity', id], { relativeTo: this.#route });
  }

  #getEntities(type: EntityType): Entity[] {
    return this.mainEntities().filter(entity => entity.type === type);
  }
}
