import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FlagFormFieldComponent } from '@flagarchive/angular';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { addEntities } from '../../state/actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlagFormFieldComponent, JsonPipe, ReactiveFormsModule, TranslateModule],
  selector: 'app-create',
  standalone: true,
  styleUrl: './create.component.css',
  templateUrl: './create.component.html',
})
export class CreateComponent {
  readonly #fb = inject(FormBuilder);
  readonly #store = inject(Store);

  form = this.#fb.nonNullable.group({
    entities: this.#fb.nonNullable.control(''),
  });

  isValid = false;

  get #entities() {
    return this.form.get('entities')!.value;
  }

  upload() {
    this.#store.dispatch(addEntities({ entities: JSON.parse(this.#entities) }));
  }

  validate(event: Event) {
    const entitiesString = (event.target as HTMLTextAreaElement).value;

    try {
      JSON.parse(entitiesString);
    } catch (error) {
      this.isValid = !!error && false;
      return;
    }

    this.isValid = true;
  }
}
