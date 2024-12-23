import { Dialog } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BreadcrumbItem,
  FlagBreadcrumbComponent,
  FlagButtonDirective,
  FlagDialogComponent,
  FlagIconComponent,
} from '@flagarchive/angular';
import { TranslateModule } from '@ngx-translate/core';

import { Entity } from '../../models';
import { TranslationKeyPipe } from '../../pipes';
import { AdvancedSearchStore, EntitiesStore } from '../../state';
import { FlagDetailsComponent } from '../flag-details';
import { FlagImageComponent } from '../flag-image';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.expanded]': 'isExpanded()',
    '(window:resize)': 'onWindowResize()',
  },
  imports: [
    FlagBreadcrumbComponent,
    FlagButtonDirective,
    FlagDetailsComponent,
    FlagIconComponent,
    FlagImageComponent,
    TranslateModule,
    TranslationKeyPipe,
  ],
  selector: 'app-entity-header',
  styleUrl: './entity-header.component.css',
  templateUrl: './entity-header.component.html',
})
export class EntityHeaderComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #dialog = inject(Dialog);
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);

  entity = input.required<Entity>();

  detailsDialog = viewChild.required<TemplateRef<FlagDialogComponent>>('detailsDialog');

  flagCategory = this.#advancedSearchStore.flagCategory;
  selected = this.#entitiesStore.selected;

  isExpanded = signal(true);
  isMobile = signal(window.innerWidth <= 640);

  breadcrumb = computed(() => this.#getBreadcrumb());
  url = computed(() => this.#setUrl());

  goToEntity(item: BreadcrumbItem) {
    const route = item.link?.split('/');
    this.#router.navigate(route || [], { relativeTo: this.#route });
  }

  onWindowResize() {
    this.isMobile.set(window.innerWidth <= 640);
  }

  openDetails() {
    this.#dialog.open<FlagDialogComponent>(this.detailsDialog());
  }

  toggleState() {
    this.isExpanded.update(expanded => !expanded);
  }

  // Split the entity ID and create a breadcrumb item for each part of the ID.
  // The link for each item is the entity ID up to that part.
  #getBreadcrumb(): BreadcrumbItem[] {
    const entity = this.entity();
    const ids = entity.parentIds?.[0]?.split('-') ?? entity.id.split('-').slice(0, -1);
    const additionalItems = entity.parentIds?.[1]
      ? [{ link: `entity/${entity.parentIds[1]}`, title: entity.parentIds[1].toUpperCase() }]
      : undefined;

    return ids.map((id, index) => ({
      link: `entity/${ids.slice(0, index + 1).join('-')}`,
      title: id.toUpperCase(),
      additionalItems,
    }));
  }

  #setUrl(): string | undefined {
    return this.selected().flagRange?.url ?? this.selected().flag?.url;
  }
}
