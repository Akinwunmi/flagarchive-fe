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
import { AdvancedSearchStateKey, AdvancedSearchStore } from '../../state';
import { getActiveRange } from '../../utils';
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
  standalone: true,
  styleUrl: './entity-header.component.css',
  templateUrl: './entity-header.component.html',
})
export class EntityHeaderComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #dialog = inject(Dialog);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);

  entity = input.required<Entity>();

  detailsDialog = viewChild.required<TemplateRef<FlagDialogComponent>>('detailsDialog');

  flagCategory = this.#advancedSearchStore[AdvancedSearchStateKey.FlagCategory];

  breadcrumb = computed(() => this.#getBreadcrumb());
  url = computed(() => this.#setUrl());

  #selectedYear = this.#advancedSearchStore[AdvancedSearchStateKey.SelectedYear];

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
    const ids = this.entity().id.split('-').slice(0, -1);
    return ids.reduce((list: BreadcrumbItem[], id, index) => {
      const link = `entity/${ids.slice(0, index + 1).join('-')}`;
      return [...list, { link, title: id.toUpperCase() }];
    }, []);
  }

  #setUrl(): string | undefined {
    const { ranges, flags } = this.entity();
    const activeRange = getActiveRange(this.#selectedYear(), ranges);
    return (activeRange?.flags ?? flags)?.[this.flagCategory()].url;
  }
}
