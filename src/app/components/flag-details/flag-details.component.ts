import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { FlagDialogComponent, FlagPillComponent } from '@flagarchive/angular';
import { TranslateModule } from '@ngx-translate/core';

import { DIALOG_IMPORTS } from '../../constants';
import { Entity, FlagCategory } from '../../models';
import { TranslationKeyPipe } from '../../pipes';
import { AdvancedSearchStateKey, AdvancedSearchStore } from '../../state';
import { getActiveRange } from '../../utils';
import { FlagImageComponent } from '../flag-image';
import { EntityComponent } from '../entity';
import { FlagCategoriesButtonComponent } from '../flag-categories-button';

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

  entity = input.required<Entity>();

  flagCategory = this.#advancedSearchStore[AdvancedSearchStateKey.FlagCategory];
  selectedYear = this.#advancedSearchStore[AdvancedSearchStateKey.SelectedYear];

  url = computed(() => this.#setUrl());

  flagCategories = Object.values(FlagCategory);

  closeDetails() {
    this.#dialogRef?.close();
  }

  #setUrl(): string | undefined {
    const { ranges, flags } = this.entity();
    const activeRange = getActiveRange(this.selectedYear(), ranges);
    return (activeRange?.flags ?? flags)?.[this.flagCategory()].url;
  }
}
