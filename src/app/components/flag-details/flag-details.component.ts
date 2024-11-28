import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FlagDialogComponent, FlagPillComponent } from '@flagarchive/angular';
import { TranslateModule } from '@ngx-translate/core';

import { DIALOG_IMPORTS } from '../../constants';
import { EntityFullRange, FlagCategory } from '../../models';
import { TranslationKeyPipe } from '../../pipes';
import { AdvancedSearchStore, EntitiesStore } from '../../state';
import { EntityComponent } from '../entity';
import { FlagCategoriesButtonComponent } from '../flag-categories-button';
import { FlagImageComponent } from '../flag-image';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ...DIALOG_IMPORTS,
    EntityComponent,
    FlagCategoriesButtonComponent,
    FlagImageComponent,
    FlagPillComponent,
    TranslateModule,
    TranslationKeyPipe,
  ],
  selector: 'app-flag-details',
  standalone: true,
  styleUrl: './flag-details.component.css',
  templateUrl: './flag-details.component.html',
})
export class FlagDetailsComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #dialogRef = inject(DialogRef<FlagDialogComponent>);
  readonly #entitiesStore = inject(EntitiesStore);

  entity = this.#entitiesStore.foundEntity;
  flagCategory = this.#advancedSearchStore.flagCategory;
  selected = this.#entitiesStore.selected;
  selectedYear = this.#advancedSearchStore.selectedYear;

  activeFlagRanges = computed(() => this.#setActiveFlagRanges());
  url = computed(() => this.#setUrl());

  flagCategories = Object.values(FlagCategory);

  closeDetails() {
    this.#dialogRef?.close();
  }

  #setActiveFlagRanges(): EntityFullRange[] | undefined {
    const entityRanges = this.entity()?.ranges;
    const flagRanges = this.selected()?.flag?.ranges;

    if (!flagRanges) {
      return entityRanges?.map(range => ({ ...range, url: this.selected().flag?.url }));
    }

    return flagRanges
      .map(({ end, start, url }) => {
        const matchingEntityRange = entityRanges?.find(
          entityRange =>
            entityRange.start <= start && (!entityRange.end || (end && entityRange.end >= end)),
        );
        return { ...matchingEntityRange, end, start, url };
      })
      .sort((a, b) => a.start - b.start);
  }

  #setUrl(): string | undefined {
    return this.selected().flagRange?.url ?? this.selected().flag?.url;
  }
}
