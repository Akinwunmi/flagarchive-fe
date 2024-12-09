import { Dialog } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  TemplateRef,
  computed,
  inject,
  input,
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

  breadcrumb = computed(() => this.#getBreadcrumb());
  url = computed(() => this.#setUrl());

  @HostBinding('class.expanded') isExpanded = true;

  isMobile = window.innerWidth < 640;

  @HostListener('window:resize') onWindowResize() {
    this.isMobile = window.innerWidth < 640;
  }

  goToEntity(item: BreadcrumbItem) {
    const route = item.link?.split('/');
    this.#router.navigate(route || [], { relativeTo: this.#route });
  }

  openDetails() {
    this.#dialog.open<FlagDialogComponent>(this.detailsDialog());
  }

  toggleState() {
    this.isExpanded = !this.isExpanded;
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
