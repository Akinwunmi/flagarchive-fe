import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FlagFormFieldComponent } from '@flagarchive/angular';
import { TranslateModule } from '@ngx-translate/core';

import { TranslationKeyPipe } from '../../pipes';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlagFormFieldComponent, ReactiveFormsModule, TranslateModule, TranslationKeyPipe],
  selector: 'app-form-field-input',
  standalone: true,
  templateUrl: './form-field-input.component.html',
})
export class FormFieldInputComponent {
  control = input.required<FormControl>();
  translationKey = input.required<string>();
  hasInfoMessage = input(false);
  required = input(false);
  type = input('text');

  id = crypto.randomUUID();
}
