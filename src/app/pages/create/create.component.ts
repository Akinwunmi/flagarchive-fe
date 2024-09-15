import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FlagFormFieldComponent } from '@flagarchive/angular';

import { EntityService } from '../../services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlagFormFieldComponent],
  selector: 'app-create',
  standalone: true,
  styleUrl: './create.component.scss',
  templateUrl: './create.component.html',
})
export class CreateComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #entityService = inject(EntityService);

  isValid = false;

  #entities = [];

  upload() {
    // ! Use state management to add entities
    this.#entityService
      .addEntities(this.#entities)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe();
  }

  validate(event: Event) {
    const entitiesString = (event.target as HTMLTextAreaElement).value;

    try {
      JSON.parse(entitiesString);
    } catch (error) {
      this.isValid = !!error && false;
      return;
    }

    this.#entities = JSON.parse(entitiesString);
    this.isValid = true;
  }
}
