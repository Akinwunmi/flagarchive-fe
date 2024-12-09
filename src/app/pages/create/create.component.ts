import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FlagTextareaComponent } from '@flagarchive/angular';
import { TranslateModule } from '@ngx-translate/core';

import { EntitiesStore } from '../../state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlagTextareaComponent, ReactiveFormsModule, TranslateModule],
  selector: 'app-create',
  styleUrl: './create.component.css',
  templateUrl: './create.component.html',
})
export class CreateComponent {
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #fb = inject(FormBuilder);

  form = this.#fb.nonNullable.group({
    entities: this.#fb.nonNullable.control(''),
  });

  isValid = false;

  get #entities() {
    return this.form.get('entities')!.value;
  }

  upload() {
    this.#entitiesStore.addEntities(JSON.parse(this.#entities));
  }

  validate(entities: string) {
    try {
      JSON.parse(entities);
    } catch (error) {
      this.isValid = !!error && false;
      return;
    }

    this.isValid = true;
  }
}
